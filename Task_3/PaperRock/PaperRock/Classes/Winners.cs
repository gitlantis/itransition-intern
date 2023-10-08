using ConsoleTables;
using System.Data;
using System.Reflection;
using System.Text;

namespace PaperRock.Classes
{
    internal class Winners
    {
        private Dictionary<(int, int), bool?> winners = new Dictionary<(int, int), bool?>();
        private string[] arguments;

        private DataTable InitTable()
        {
            var table = new DataTable();
            table.Columns.Add("PC v & User >");

            foreach (string arg in this.arguments)
            {
                table.Columns.Add(arg);
            }

            for (var i = 1; i <= this.arguments.Length; i++)
            {

                var row = new List<string>();

                row.Add(this.arguments[i - 1]);

                for (var j = 1; j <= this.arguments.Length; j++)
                {
                    if (winners.ContainsKey((j, i)))
                        row.Add(WinValue(winners[(j, i)]));
                    else row.Add("");
                }
                table.Rows.Add(row.ToArray());
            }
            return table;
        }

        private string WinValue(bool? val)
        {
            if (val == true) return "Win";
            else if (val == null) return "Draw";
            else return "Lose";
        }

        public void SetArguments(string[] args)
        {
            this.arguments = args;
        }

        public string AddWinner(int user, int computer, bool? result)
        {
            if (winners.Count < this.arguments.Length * this.arguments.Length)
                winners[(user, computer)] = result;
            else return "Game is over please restart the game!";
            return "";
        }

        public void ShowWinners()
        {
            var data = InitTable();
            string[] columnNames = data.Columns.Cast<DataColumn>().Select(x => x.ColumnName).ToArray();

            var rows = data.Select();
            var table = new ConsoleTable(columnNames);

            foreach (var row in rows)
            {
                table.AddRow(row.ItemArray);
            }
            table.Write(Format.Default);
        }

    }
}
