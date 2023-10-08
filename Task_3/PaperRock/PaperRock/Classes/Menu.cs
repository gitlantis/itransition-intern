using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace PaperRock.Classes
{
    internal class Menu
    {
        private Winners winners = new Winners();
        
        public string[] Items;
        public int choice;

        private void Exit()
        {
            Environment.Exit(0);
        }

        private string[] DistinctArray(string[] args)
        {
            return args.Distinct().ToArray();
        }

        public Menu(string[] args, Winners winners)
        {
            this.Items = DistinctArray(args);
            this.winners = winners;
        }
        public void PrintMoves()
        {
            var i = 0;
            foreach(var item in Items)
            {
                i++;
                Console.WriteLine($"{i} - {item}");

            }
            Console.WriteLine($"0 - exit");
            Console.WriteLine($"? - help");
        }

        public string Choice(string item)
        {
            int.TryParse(item, out int num);
            switch (item) {
                case var expression when num > 0 && num < Items.Length+1:
                    return Items[num - 1];
                case "0":
                    Exit();
                    return "";
                case "?":
                    winners.ShowWinners();
                    return "";
                default:
                    PrintMoves();
                    return "";
            }
        }

        public bool Range(int item)
        {
            return item>0 && item<=Items.Length;
        }

        public void AnalyseInputs()
        {   
            if (!(Items.Length >= 3 && Items.Length % 2 == 1))
            {
                Console.WriteLine("Only odd number of and higher than 3 items are acceptable!");
                Exit();
            }
        }
    }
}
