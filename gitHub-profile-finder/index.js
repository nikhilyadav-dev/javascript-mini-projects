const url = "https://api.github.com/users";
const searchBtnEl = document.getElementById("searchBtn");
const inputEl = document.getElementById("inputElement");
const proeWrapperEl = document.querySelector(".profile-wrapper");
const loaderEl = document.querySelector(".loader");

const generateProfile = (profileDetail) => {
  return `<div class="profile-container">
        <div class="top-section">
          <div class="left">
            <div class="avtar">
              <img
                src=${profileDetail.avatar_url}
                alt="avtar"
              />
            </div>
            <div class="username">
              <h3>${profileDetail.name}</h3>
              <h4>${profileDetail.login}</h4>
            </div>
          </div>
          <a href= ${profileDetail.html_url}  target="_black" >
          <button class="checkProfileBtn search">Check Profile</button>
            </a>
        </div>
        <div class="about">
          <h2>About</h2>
          <p>
           ${profileDetail.bio}
          </p>
        </div>
        <div class="status-section">
          <div class="status">
            <h3>Followers</h3>
            <p>${profileDetail.followers}</p>
          </div>
          <div class="status">
            <h3>Following</h3>
            <p>${profileDetail.following}</p>
          </div>
          <div class="status">
            <h3>Repos</h3>
            <p>${profileDetail.public_repos}</p>
          </div>
        </div>
      </div>`;
};
const fetchProfile = async () => {
  const profileName = inputEl.value;

  try {
    loaderEl.innerText = "Loading.......";
    loaderEl.style.color = "red";
    inputEl.value = "";
    let res = await fetch(`${url}/${profileName}`);
    let profileDetail = await res.json();
    console.log(profileDetail);
    if (profileDetail.login) {
      loaderEl.innerText = "";
      proeWrapperEl.innerHTML = `${generateProfile(profileDetail)}`;
    } else {
      proeWrapperEl.innerHTML = ``;
      loaderEl.innerText = "Profile Not Found";
    }
  } catch (err) {
    console.log(err);
  }
};

searchBtnEl.addEventListener("click", fetchProfile);
