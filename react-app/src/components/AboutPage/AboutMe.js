import './index.css';
import { FaReact, FaJsSquare, FaFlask, FaPython, FaMortarPestle, FaGithub } from 'react-icons/fa';

function AboutMe() {

    const icons = [
        {'tech-icon': <FaReact className='fa-5x'/>, 'name': 'React'},
        {'tech-icon': <FaJsSquare className='fa-5x'/>, 'name': 'Javascript'},
        {'tech-icon': <FaFlask className='fa-5x'/>, 'name': 'Flask'},
        {'tech-icon': <FaPython className='fa-5x'/>, 'name': 'Python'},
        {'tech-icon': <FaMortarPestle className='fa-5x'/>, 'name': 'SQLAlchemy'},
        {'tech-icon': <FaGithub className='fa-5x'/>, 'name': 'GIT'},
    ]

    return (
      <>
      <p className="about-coder-div">About the Coder</p>
      <div className="about-me-div">
          <div className="about-me-div">
              <div className="about-me-pic"
                   style={{ backgroundImage: `url("https://res.cloudinary.com/dymmlu1dw/image/upload/v1667338766/MediumClone/kate-square-pic2_yybmtf.jpg")` }}></div>
             <div className="about-me-text">
                 <div className="my-name">Kaitlin Cizewski</div>
                 <div className='my-blurb'>Software engineer by night and single mom by day. I'm a small town girl from Pennsylvania who loves organizing code and writing.</div>
                 <div className="my-links">
                    <a href={"https://github.com/KateCiz"} className="my-github">GitHub</a>
                    <a href={"https://www.linkedin.com/in/kaitlin-cizewski/"} className="my-linkedin">LinkedIn</a>
                 </div>
                 <div className='technologies-bar'>
                    {icons.map(icon => {
                         return (
                                 <div className="one-tech-div">
                                    <div className="icon-div">{icon['tech-icon']}</div>
                                    <div className="icon-name-div">{icon['name']}</div>
                                </div>
                         )
                    })}
                  </div>
             </div>
          </div>
        </div>
      </>
    );
  }

  export default AboutMe;
