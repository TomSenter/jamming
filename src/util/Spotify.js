let accessToken;
let expiresIn;
// assume this is OAuth 
// use an object to store methods that access the API and do extra things
const redirect = 'http://localhost:3000/';
const clientID = 'b5d4b40c678b42fdb428e6fa9fe39a22';
export const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } 

        // check url window.location.href returns url of that page
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            expiresIn = Number(expiresInMatch[1]);
            // clears everything 
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect}`;
        }
    },

    search(term){
        const accessToken = this.getAccessToken();
       return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
          headers:{
              Authorization: `Bearer ${accessToken}`
            }
        }).then(response=>{
            if(response.ok){
                return response.json();
            }
        },networkError=>console.log(networkError.message)
        ).then(jsonResponse=>{
            
              
            if(!jsonResponse.tracks){
                return [];
            }
            
            return  jsonResponse.tracks.items.map(track=>
                 ({id:track.id,name:track.name,artists:track.artists[0].name,album:track.album.name,uri:track.uri})
            );
        });
    },

    savePlaylist(name,array){
       if(!name || !array){
           // return exits the function 
           return;
       }

       const accessToken = this.getAccessToken();
       const headers = {
        Authorization: `Bearer ${accessToken}`
       };
       let userID;

       return fetch('https://api.spotify.com/v1/me',{headers:headers}).then(response=>{
           if(response.ok){
               return response.json();
           }
       },networkError=> console.log(networkError.message)
       ).then(jsonResponse=>{
           userID = jsonResponse.id;
           // second fetch
           return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
               method:'POST',
               headers:headers,
               body:JSON.stringify({name:name})}).then(response=>{
                   if(response.ok){
                       return response.json();
                   }
               },networkError=>console.log(networkError.message)
               ).then(jsonResponse=>{
                   const playlistID = jsonResponse.id;
                   //second fetch 
                   return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                       method:'POST',
                       headers: headers,
                       body: JSON.stringify({uris:array})
                   });
                   
               });

       });

       
    }

     


};