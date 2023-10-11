using PaperRock.Classes;

var crypto = new Cryptography();
var process = new Process();
var winners = new Winners();
var menu = new Menu(args, winners);

menu.AnalyseInputs();
winners.SetArguments(menu.Items);


Console.WriteLine("Available moves:");

menu.PrintMoves();

while (true)
{
    var (computerChoiceStr, computerChoice) = process.ComputersChoice(menu.Items);

    var key = crypto.GeneratKey(32);
    var hmac = crypto.EncryptMessage(key, computerChoiceStr);

    Console.WriteLine($"HMAC: {hmac}");

    Console.Write("Enter your move: ");
    var userCharChoice = Console.ReadLine();

    try
    {
        var userStrChoice = menu.Choice(userCharChoice);
        int.TryParse(userCharChoice, out int userChoice);

        if (menu.Range(userChoice))
        {

            Console.WriteLine($"Your move: {userStrChoice}");
            Console.WriteLine($"Computer move: {computerChoiceStr}");

            var (message, result) = process.DetectWinner(menu.Items, userChoice, computerChoice);
            Console.WriteLine(message);
            var winnersMessage = winners.AddWinner(userChoice, computerChoice, result);
            Console.WriteLine(winnersMessage);
        }
        Console.WriteLine($"HMAC key: {key}");
        Console.WriteLine();
    }
    catch (Exception e)
    {
        Console.WriteLine(e.Message);
    }
}