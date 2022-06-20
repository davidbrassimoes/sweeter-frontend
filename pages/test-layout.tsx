import styles from 'test-layout.module.css'

export default function TestLayout() {
    return (
        <>
            <div className="post userPost">
                <img src="https://www.github.com/davidbrassimoes.png" alt="" className="avatar" />
                <div className="text-content">
                    <textarea placeholder="Tell us something Sweet..." wrap="hard" maxlength="255" rows="5"
                        cols="50"></textarea>
                    <button className="sweet-button">
                        <a href="/">Sweet</a>
                    </button>
                </div>

            </div>
            <div className="post">
                <img src="https://www.github.com/davidbrassimoes.png" alt="" className="avatar" />
                <div className="text-content">
                    <h2>@maquinamole</h2>
                    <span>&middot;</span>
                    <i>Date</i>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam officia modi ad eum corrupti. Animi
                        corrupti hic rerum qui fuga mollitia voluptatem consequuntur magni deserunt tenetur, incidunt,
                        fugit, ratione nulla.</p>
                    <button className="sweet-button">
                        <a href="/">Sweet</a>
                    </button>
                </div>
            </div>
            <div className="post">
                <img src="https://www.github.com/davidbrassimoes.png" alt="" className="avatar" />
                <div className="text-content">
                    <h2>@maquinamole</h2>
                    <span>&middot;</span>
                    <i>Date</i>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam officia modi ad eum corrupti. Animi
                        corrupti hic rerum qui fuga mollitia voluptatem consequuntur magni deserunt tenetur, incidunt,
                        fugit, ratione nulla.</p>
                    <button className="sweet-button">
                        <a href="/">Sweet</a>
                    </button>
                </div>
            </div>
            <div className="post">
                <img src="https://www.github.com/davidbrassimoes.png" alt="" className="avatar" />
                <div className="text-content">
                    <h2>@maquinamole</h2>
                    <span>&middot;</span>
                    <i>Date</i>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam officia modi ad eum corrupti. Animi
                        corrupti hic rerum qui fuga mollitia voluptatem consequuntur magni deserunt tenetur, incidunt,
                        fugit, ratione nulla.</p>
                    <button className="sweet-button">
                        <a href="/">Sweet</a>
                    </button>
                </div>
            </div>

        </>
    )
}
