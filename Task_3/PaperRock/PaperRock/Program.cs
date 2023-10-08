using PaperRock.Classes;

var crypto = new Cryptography();
var process = new Process();
var winners = new Winners();
var menu = new Menu(args, winners);

menu.AnalyseInputs();
winners.SetArguments(menu.Items);

var hmac = crypto.ComputeSHA256Hash(String.Join("", menu.Items));

Console.WriteLine($"HMAC: {hmac}");
Console.WriteLine("Available moves:");

menu.PrintMoves();

while (true)
{
    Console.Write("Enter your move: ");
    var userCharChoice = Console.ReadLine();

    try
    {
        var userStrChoice = menu.Choice(userCharChoice);
        int.TryParse(userCharChoice, out int userChoice);

        if (menu.Range(userChoice))
        {
            var (computerChoiceStr, computerChoice) = process.ComputersChoice(menu.Items);

            Console.WriteLine($"Your move: {userStrChoice}");
            Console.WriteLine($"Computer move: {computerChoiceStr}");

            var (message, result) = process.DetectWinner(menu.Items, userChoice, computerChoice);
            Console.WriteLine(message);
            var newKey = hmac + computerChoice;
            var newHmac = crypto.ComputeSHA256Hash(newKey);
            Console.WriteLine($"HMAC key: {newHmac}");
            var winnersMessage = winners.AddWinner(userChoice, computerChoice, result);
            Console.WriteLine(winnersMessage);
        }
    }
    catch (Exception e)
    {
        Console.WriteLine(e.Message);
    }
}