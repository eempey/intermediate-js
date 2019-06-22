document.getElementById('getMostFollowers')
    .addEventListener('click', function(){
        getMostFollowers('elie', 'colt', 'tigarcia', 'eempey');
    });

function renderTable(tableData){
    let table = document.createElement('table');
    table.classList.add('table', 'is-bordered', 'is-hoverable');
    let thead = table.createTHead();
    let tbody = table.createTBody();
    let headerRow = thead.insertRow();
    let headings = ['Name', 'Followers'];
    for(let heading in headings){
        let th = document.createElement('th');
        th.innerText = headings[heading];
        headerRow.appendChild(th);
    }

    for(let tableDatum in tableData){
        let row = tbody.insertRow();
        let tdName = document.createElement('td');
        tdName.innerText = tableData[tableDatum].data.name;
        row.appendChild(tdName);
        let tdFollowers = document.createElement('td');
        tdFollowers.innerText = tableData[tableDatum].data.followers;
        row.appendChild(tdFollowers);
    }

    document.getElementById('gitHubUsers').prepend(table);
}

function getMostFollowers(...usernames){
    let gitHubPromises = usernames.map(function(username){
        return axios.get(`https://api.github.com/users/${username}`);
    });

    Promise.all(gitHubPromises).then(
        function(gitHubUsers){
            if(gitHubUsers.length){
                renderTable(gitHubUsers);
            }

           let highestFollowers = gitHubUsers.reduce((max, gitHubUser) =>
               gitHubUser.data.followers > max.data.followers ? gitHubUser : max
           );

           document.getElementById('highestFollowers').innerText =
               `${highestFollowers.data.name} has the most followers with ${highestFollowers.data.followers}`;
        },
        function(error){
            //document.getElementById('gitHubUsers').prepend(table);
            console.log(error);
        });
}

document.getElementById('starWarsString')
    .addEventListener('click', function(){
        starWarsString(6);
    });

function starWarsString(number){
    let str = '';
    return axios.get(`https://swapi.co/api/people/${number}`).then(function(character){
        str += `${character.data.name} is featured in `;
        console.log(character);
        return  axios.get(character.data.films[0]);
    }).then(function(film){
        str += `${film.data.title}, directed by ${film.data.director} `;
        console.log(film);
        return axios.get(film.data.planets[0]);
    }).then(function(planet){
        str += `and takes place on ${planet.data.name}.`;
        console.log(str);
        return str;
    });
}