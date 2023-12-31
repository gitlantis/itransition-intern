﻿using SHA3.Net;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
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

        public string GeneratKey(int len)
        {            
            var randomGenerator = RandomNumberGenerator.Create();
            byte[] data = new byte[len];
            randomGenerator.GetBytes(data);
            var result = BitConverter.ToString(data).Replace("-", "");
            return result;
        }

        public string EncryptMessage(string key, string message)
        {
            using (var hmac = new HMACSHA256(Encoding.ASCII.GetBytes(key)))
            {
                byte[] hashValue = hmac.ComputeHash(Encoding.ASCII.GetBytes(message));
                var builder = new StringBuilder();
                for (int i = 0; i < hashValue.Length; i++)
                {
                    builder.Append(hashValue[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
