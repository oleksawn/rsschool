export const templates = {
  about: `
  <div class="about">
    <h2 class="heading">How to play</h2>
    <ul class="steps">
      <li class="step__item">1 step: You should <span class="login">Log in</span> to play match-match game</li>
      <li class="step__item">2 step: You can set up game difficulty and card themes if you want</li>
      <li class="step__item">3 step: Start game!</li>
      <li class="step__item">4 step: You can see the best results</li>
    </ul>
    <h2 class="heading">What is match-match game</h2>
    <p>Match game is a game that require player to match similar elements. Participant need to find a match for a card.
      You have 16 or more pictured cards; composed of 8 pairs, face down in random order. </p>
  </div>
  `,
  header: `
  <div class="container">
  <nav class="nav">
    <a href="#about" class="nav__item nav__about">About game</a>
    <a href="#form" class="nav__item nav__form">Log in</a>
    <a href="#settings" class="nav__item nav__settings">Settings</a>
    <a href="#game" class="nav__item nav__item_hidden nav__game">Play game</a>
    <a href="#scores" class="nav__item nav__scores">Best players</a>
  </nav>
  <div class="loggedGamer">
    <div class="loggedGamer__data"><p>Log in, please</p></div>
  </div>
  <main id='#page'></main>
  </div>
`,
  form: `
  <form class="logForm">
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
    <input type="text" id="score" placeholder="Score">
    <div class="wrapper">
      <button id="cleanButton">Clean</button>
      <button id="addButton" type="submit">Log in</button>
    </div>
  </form>
`,
  settings: `
  <div class="gameSettings">
   <p class="select selectHeading">Game difficulty</p>
   <select>
    <option value="12">16 cards</option>
    <option value="20">36 cards</option>
    <option value="30">64 cards</option>
   </select>
   <p class="select selectTheme">Card theme</p>
   <select>
    <option value="underwater">Underwater</option>
    <option value="butterflies">Butterflies</option>
   </select>
   </div>
  `,
  game: ``,
  scores: '<div class="player"><div class="left-col"><p class="player__name">{fname} {lname}</p><p class="player__email">{email}</p></div><div class="right-col"><p class="player__score">Score: <span>{score}</span></p></div></div>'
};