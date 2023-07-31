function Card({likes, _id, name, link, owner, onCardClick}) {
  const likeCounter = likes.length;

  function handleClick() {
    onCardClick({name, link});
  }
  return(
    <div className="card-template">
      <article className="element">
        <div className="element__image-container">
          <img className="element__image" src = {link}  alt={`Изображение добавленное пользователем: Название "${name}"`} onClick ={handleClick}/>
          <div className="element__trash"></div>
        </div>
        <div className="element__plank">
          <h2 className="element__name">{name}</h2>
          <div className="element__like-container">
            <button className="element__like" type="button" aria-label="лайк"></button>
            <p className="element__like-counter">{likeCounter}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
export default Card;
