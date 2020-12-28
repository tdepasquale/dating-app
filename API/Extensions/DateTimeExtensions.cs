using System;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dateOfBirth){
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            //Haven't had birthday yet this year.
            if(dateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}