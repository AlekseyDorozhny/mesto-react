import headerLogo from '../Images/headerLogo.svg'

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src= {headerLogo} alt="Логотип Mesto Russia"/>
    </header>
  );
}

  export default Header;
