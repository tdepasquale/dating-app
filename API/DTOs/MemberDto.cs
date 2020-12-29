using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
         public int Id { get; set; }
        //DotNet Identity expects UserName to be capitalized like this.
        public string Username { get; set; }
        public string MainPhotoUrl { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}