export const templates = {
  about: `
  <div class="about">
    <h2 class="about__heading">How to play?</h2>
    <div class="section about__reg">
      <div class="info">
        <div class="number">1</div>
        <p class="text">Register new player in game</p>
      </div>
      <div class="example"></div>
    </div>
    <div class="section about__set">
      <div class="info">
        <div class="number">2</div>
        <p class="text">Configure your game settings</p>
      </div>
      <div class="example"></div>
    </div>
    <div class="section about__game">
      <div class="info">
        <div class="number">3</div>
        <p class="text">Start your new game1 Remember card positions and match it before times up.</p>
      </div>
      <div class="example"></div>
    </div>
  </div>
  `,
  header: `
  <div class="header">
    <div class="header-container">
      <div class="logo">
        <p class="logo_up">match</p>
        <p class="logo_down">match</p>
      </div>
      <nav class="nav">
        <a href="#about" class="nav__item nav__about"><div class="nav__icon nav__icon_about"></div><p>About Game</p></a>
        <a href="#scores" class="nav__item nav__scores"><div class="nav__icon nav__icon_scores"></div><p>Best Players</p></a>
        <a href="#settings" class="nav__item nav__settings"><div class="nav__icon nav__icon_settings"></div><p>Game Settings</p></a>
      </nav>
      <div class="header-buttons">
        <a href="#game" class="header__btn hidden header__btn_game">Game</a>
        <button class="header__btn header__btn_form">Register New Player</button>
        <div class="loggedGamer">
          <div class="loggedGamer__data"><p>Log in, please</p></div>
        </div>
      </div>
    </div>
  </div>
  <main id='#page'></main>
`,
  form: `
  <div class="form-container">
  <form class="logForm">
    <a href="#about" class="close-btn"></a>
    <h2 class="form-heading">Registr new player</h2>
    <div class="inputs-container">
      <div class="wrapper">
        <input type="text" id="fname" placeholder="First name">
        <div class="ok_fname ok"></div>
        <div class="err_fname err"><div class="angle"></div><p class="err_message"></p></div>
      </div>
      <div class="wrapper">
        <input type="text" id="lname" placeholder="Last name">
        <div class="ok_lname ok"></div>
        <div class="err_lname err"><div class="angle"></div><p class="err_message"></p></div>
      </div>
      <div class="wrapper">
        <input type="email" id="email" placeholder="Email">
        <div class="ok_email ok"></div>
        <div class="err_email err"><div class="angle"></div><p class="err_message"></p></div>
      </div>
      <div class="wrapper">
        <button id="cleanButton">Clean</button>
        <a href="#about" id="addButton" type="submit">Add user</a>
      </div>
    </div>
  </form>
  </div>
`,
  settings: `
  <div class="gameSettings">
    <p class="select selectHeading">Game difficulty</p>
    <select class="select" id="select-difficulty">
      <option value="16">16 cards</option>
      <option value="36">36 cards</option>
      <option value="64">64 cards</option>
    </select>
    <p class="select selectTheme">Card theme</p>
    <select class="select" id="select-theme">
      <option value="underwater">Underwater</option>
      <option value="butterflies">Butterflies</option>
    </select>
  </div>
  `,
  game: `
  <div class="game-wrapper">
    <div class="game-buttons">
      <button class="game-btn game-btn_start"></button>
      <button class="game-btn game-btn_stop hidden"></button>
      <p class="timer show"><span class="timer-min">00</span>:<span class="timer-sec">00</span></p>
      <p class="score show">Score</p>
    </div>
    <div class="game-cards game-cards_16"></div>
  </div>
  `,
  card: `
  <div class="card-container">
    <div class="card">
      <div class="card__front"></div>
      <div class="card__back"></div>
    </div>
  </div>
  `,
  congrat: `
    <div class="congrat-wrapper">
    <div class="congrat">
      <p class="congrat-message">Congratulations!</p>
      <a class="congrat__scores-btn" href="#scores">Go to Best Players</a>
    </div>
    </div>
  `,
  scores: '<div class="player"><div class="left-col"><p class="player__name">{fname} {lname}</p><p class="player__email">{email}</p></div><div class="right-col"><p class="player__score">Score: <span class="player__score-num">{score}</span></p></div></div>'
};