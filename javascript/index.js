const url = 'https://api.github.com/users';
const count = 5;
const sort = "created:asc";
const containerUser = document.querySelector('.container-user');
const containerRepos = document.querySelector('.user-repos');
const tbody = document.querySelector(".tbody")

function OcultarAnim(){
    document.getElementById('animation').style.display = 'none';
}
const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener("click", getUser, OcultarAnim);

async function getUser() {
    const name = document.getElementById("search-input").value;

    if(name == "") {
        alert('Digite um usuário para pesquisar');
    } else {
        const responseProfile = await fetch(`${url}/${name}`);
        const profile = await responseProfile.json();

        const responseRepos = await fetch(`${url}/${name}/repos?per_page=${count}&sort=${sort}`);
        const repos = await responseRepos.json();

        console.log(repos)

        return ShowProfile(profile), showRepos(repos);        
    };

};

function ShowProfile(user) {
     containerUser.innerHTML = `
             <div class="user-photo">
                 <img src="${user.avatar_url}" alt="" class="photo">
                 <div class="user-area-name-link">
                     <p class="nickname">${user.login}</p>
                     <a href="${user.html_url}" class="button">Veja o Pefil</a>
                 </div>
                 <div class="user-status">
                     <ul class="status-ul">
                         <li class="status-li"><span class="seguidores"><i class="fas fa-users"></i>Seguidores</span><span class="badge badge-seguidores">${user.followers}</span></li>
                         <li class="status-li"><span class="seguindo"><i class="fas fa-heart"></i>Seguindo</span><span class="badge badge-seguindo">${user.following}</span></li>
                         <li class="status-li"><span class="repositorios"><i class="fas fa-rocket"></i>Repositórios</span><span class="badge badge-respositorios">${user.public_repos}</span></li>
                     </ul>
                 </div>
             </div>             
             <div class="user-bio">
                 <div class="bio-name-data">
                     <span class="name">${user.name}</span>
                     <span class="data">Entrou ${user.created_at.slice(0, 4)}</span>
                 </div>
                 <p class="biografia">${user.bio}</p>
             </div>
             <div class="user-repos">
                <table class="table">
                    <thead class="thead">
                        <tr>
                            <th>Projetos</th>
                            <th>Stars</th>
                            <th>Forks</th>
                        </tr>
                    </thead>
                    <tbody class="tbody">
                    </tbody>
                </table>
            </div>                      
             <div class="user-footer">
                 <span><i class="fas fa-map-marker-alt"></i> ${user.location}</span>
                 <span><i class="fas fa-building"></i> ${user.company}</span>
                 <span><i class="fas fa-icons"></i> ${user.twitter_username}</span>
             </div>
             `              
 };

 function showRepos(repos) {
    let output = "";
    repos.forEach(repo => {
        output += `    
        <tr>
            <td class="nameProject"><a href="${repo.html_url}" target="_blank">${repo.name}</td>
            <td class="numbers">${repo.stargazers_count}</td>
            <td class="numbers">${repo.forks_count}</td>
        </tr>              
    `
        document.querySelector('.tbody').innerHTML = output;
    });
};

    


 
 