using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace PaperRock.Classes
{
    internal class Process
    {
        private (string, bool?) WinMssage(bool? result)
        {
            if (result == true)
                return ("You Win!", result);
            else if (result == null)
                return ("Draw!", result);
            else
                return ("You Loose!", result);
        }

        private bool? WinnerGraph(string[] args, int user, int computer)
        {
            var nextNodes = new Stack<int>();

            if (user == computer)
                return null;

            int nextNodeIndex = user + 1;

            for (int i = 0; i < ((args.Length - 1) / 2); i++)
            {
                if (nextNodeIndex + i > args.Length)
                    nextNodes.Push((nextNodeIndex + i) % args.Length);
                else nextNodes.Push(nextNodeIndex + i);
            }

            if (!nextNodes.Contains(computer))
                return true;

            return false;
        }

        public (string, int) ComputersChoice(string[] args)
        {
            var rand = new Random();
            var randValue = rand.Next(args.Length);
            return (args[randValue], randValue + 1);
        }

        public (string, bool?) DetectWinner(string[] args, int user, int computer)
        {
            var winner = WinnerGraph(args, user, computer);
            return WinMssage(winner);
        }
    }
}
