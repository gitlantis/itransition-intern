using SHA3.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperRock.Classes
{
    internal class Cryptography
    {
        private string ByteArrayToString(byte[] arrInput)
        {
            int i;
            StringBuilder sOutput = new StringBuilder(arrInput.Length);
            for (i = 0; i < arrInput.Length - 1; i++)
            {
                sOutput.Append(arrInput[i].ToString("X2"));
            }
            return sOutput.ToString();
        }

        public string ComputeSHA256Hash(string text)
        {
            using (var shaAlg = Sha3.Sha3256())
            {
                var hash = shaAlg.ComputeHash(Encoding.UTF8.GetBytes(text));
                return ByteArrayToString(hash);
            }
        }
    }
}
