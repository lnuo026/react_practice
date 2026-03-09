import { useState } from "react";

export default function Button(){
      const [Likes , setLikes] =  useState(false);

      return (
        <button onClick={()=> setLikes(!Likes)}>
            { Likes? 'unlike': 'like'}
            
            </button>
        
      );
}
