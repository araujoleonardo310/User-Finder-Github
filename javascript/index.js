const url = 'https://api.github.com/users';
const count = 5;
const sort = "created:asc"

function OcultarAnim(){
    document.getElementById('animation').style.display = 'none';
}
const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener("click", getUser, OcultarAnim);

async function getUser() {
    const User = document.getElementById("search-input").value;

    if(User == "") {
        alert('Digite um usuário para pesquisar');
    } else {
        const responseProfile = await fetch(`${url}/${User}`);
        const profile = await responseProfile.json();

        const responseRepos = await fetch(`${url}/${User}/repos?per_page=${count}&sort=${sort}`);
        const profileRepos = await responseRepos.json();

        return ShowProfile(profile, profileRepos);
    };

};

function ShowProfile(user, repos) {
     
     const profile = document.querySelector('.container-user')
     profile.innerHTML = `
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
             </div>
 
             <div class="user-footer">
                 <i class="fas fa-map-marker-alt"></i><span>${user.location}</span>
                 <i class="fas fa-building"></i><span>${user.company}</span>
                 <i class="fas fa-icons"></i><span>${user.twitter_username}</span>
             </div>
             `              
 };
 
 