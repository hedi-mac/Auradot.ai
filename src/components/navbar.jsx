import "./style.css"
import Link from 'next/link';
import TransitionLink from '@/lib/TransitionLink'

function NavbarList() {
  return (
    <div style={{position: 'relative'}}>
        <ul>
          <div className="child_menu">
            <li><img src="/logo.png" style={{width: '64px', height: '64px'}} /></li>
            <li><Link href="/home"><h1>Auradot AI</h1></Link></li>
          </div>
          <div className="child_menu">
            <li><TransitionLink href="/home" className="navbar_links">Home </TransitionLink></li>
            <li><TransitionLink href="/contact" className="navbar_links">Contact</TransitionLink></li>
            <li style={{float:"right"}} className="navbar_links"><a href="#about">About</a></li>
          </div>
        </ul>
    </div>
    
  );
}
export default NavbarList;