const Menu = () => {
  return (
    <>
           {menuPages.map( (el, i) => (
        <li>
          <a 
            href={el.name} 
            key={i}
            onClick={handleNavClick}
            className='flex-col'
            >
            <i className={'fa-solid fa-2x  ' + el.class}></i>
            {el.name}</a>
        </li>
      ))}
    </>
  )
}

export default Menu