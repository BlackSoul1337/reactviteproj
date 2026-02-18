import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    return (
        <div>
            <section>
                <div>
                    <h1>Бронирование мероприятий</h1>
                    <p>Крутые мероприятия лвдфылв</p>
                    <button onClick={() => navigate("/events")}>Просмотр мероприятий</button>
                </div>
            </section>
            <section>
                <div>
                    <h2>Почему мы</h2>
                    <ul>
                        <li>Крутые</li>
                        <li>Хайповые</li>
                        <li>Классные</li>
                    </ul>
                </div>

                <div>
                    <img src="https://i.pinimg.com/736x/51/7a/35/517a356b90effbf603ffbecf34e71e0d.jpg" alt="dasdsa" />
                </div>
            </section>

            <section>
                <h2>Пупуу</h2>
                <div>
                    <button onClick={() => navigate("/events")}>Каталог</button>
                    <button onClick={() => navigate("/registration")}>Регистрация</button>
                </div>
            </section>
        </div>
    )
}

export default Home