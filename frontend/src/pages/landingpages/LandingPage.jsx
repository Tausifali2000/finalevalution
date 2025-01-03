


import landingStyle from "./cssModules/landing.module.css";
import { Link } from 'react-router-dom';



const LandingPage = () => {
  return (
    <>
      <div className={landingStyle.landingpage}>
        <header className={landingStyle.header}>
          <div className={`${landingStyle.logo} ${landingStyle.headerLogo}`}>
            <span>
              <img
                src="/SVG.png"
               
                className={landingStyle.logoIcon}
              />
            </span>
            <span>FormBot</span>
          </div>
          <div className={landingStyle.headerbuttons}>
            <Link to="/login"><button className={`${landingStyle.btn} ${landingStyle.secondary}`}>
              Sign in
            </button></Link>
            <Link to="/signup">
            <button
              className={`${landingStyle.btn} ${landingStyle.primary} ${landingStyle.ml10}`}
            >
              Create a FormBot
            </button>
            </Link>
          </div>
        </header>
  
       
          <div className={landingStyle.shapes}>
            <img
              src="/triangle.png"
             
              className={landingStyle.triangle}
            />
            <img
              src="/semicircle.png"
              
              className={landingStyle.semicircle}
            />
          </div>
  
          <div className={landingStyle.herosection}>
            <h1 className={landingStyle.title}>Build advanced chatbots visually</h1>
            <p className={landingStyle.subtitle}>
              Typebot gives you powerful blocks to create unique chat experiences.
              Embed them anywhere on your web/mobile apps and start collecting results
              like magic.
            </p>
            <Link to="/signup">
            <button className={`${landingStyle.btn} ${landingStyle.primary}`}>
              Create a FormBot for Free
            </button>
            </Link>
            
          </div>
  
          <div className={landingStyle.imagepreview}>
            <img
              src="blur2.png"
              alt="Yellow Blur Background"
              className={landingStyle.yellowBlurBg}
            />
            <img
              src="blur1.png"
              alt="Blue Blur Background"
              className={landingStyle.blueBlurBg}
            />
            <img
              src="image.png"
              alt="FormBot Workflow Preview"
              className={landingStyle.previewimage}
            />
          </div>
       
  
        <footer className={landingStyle.footer}>
          <div className={landingStyle.footersection}>
            <div className={landingStyle.logo}>
              <span>
                <img
                  src="SVG.png"
                  alt="FormBot Logo"
                  className={landingStyle.logoIcon}
                />
              </span>
              <span>FormBot</span>
            </div>
            <p>
              Made with ❤️ by <br />
              @cuvette
            </p>
          </div>
          <div className={landingStyle.footersection}>
            <h4>Product</h4>
            <ul>
              <li>
                Status <img src="/link.png" alt="Share Icon" />
              </li>
              <li>
                Documentation <img src="/link.png" alt="Share Icon" />
              </li>
              <li>
                Roadmap <img src="/link.png" alt="Share Icon" />
              </li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className={landingStyle.footersection}>
            <h4>Community</h4>
            <ul>
              <li>
                Discord <img src="/link.png" alt="Share Icon" />
              </li>
              <li>
                GitHub Repository <img src="/link.png" alt="Share Icon" />
              </li>
              <li>
                Twitter <img src="/link.png" alt="Share Icon" />
              </li>
              <li>
                LinkedIn <img src="/link.png" alt="Share Icon" />
              </li>
              <li>OSS Friends</li>
            </ul>
          </div>
          <div className={landingStyle.footersection}>
            <h4>Company</h4>
            <ul>
              <li>About</li>
              <li>Contact</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
  
 
}

export default LandingPage