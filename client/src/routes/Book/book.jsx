import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Book() {

    const baseUrl = "https://crud-bookapplication-2.onrender.com/api/books";
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");


    useEffect(() => {

        const fetchData = async () => {
            try {
                let url = baseUrl;
                if (selectedCategory) {
                    url += `?category=${selectedCategory}`
                }

                //this gives the response as ok.
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }

                //converting response into json
                const jsonData = await response.json();
                setData(jsonData);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
                setError("Error fetching data. Please try again later.")
                setIsLoading(false);
            }
        }
        //starting fetching data
        fetchData();
    }, [selectedCategory]);


    return (
        <div>
            <h1>Books</h1>
            <p>This is where we use Nodejs, Express & MongoDB to grab some data.</p>
            
            <Link to="/createbook">+ Add New Book</Link>
            <h2>Fetch Example</h2>
            {/*<pre>{JSON.stringify(data,null,2)}</pre>*/}

            <div className="filters">
                <label>Categories</label>
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value=""> All </option>
                    <option value="romance"> Romance </option>
                    <option value="science"> Science </option>
                    <option value="crime"> Crime </option>
                    <option value="food"> Food </option>
                    <option value="adventure"> Adventure </option>
                    <option value="thriller"> Thriller </option>
                    <option value="fiction"> Fiction </option>
                    <option value="other"> Other </option>
                </select>
            </div>

            {isLoading ? (
                <p>Loading....</p>
            ) : error ? (
                <p>{error}</p>
            ) : (

                <ul className="books">
                    {data.map((item) => (
                        <li key={item._id}>
                            <Link to={`/books/${item.slug}`}>
                                <img src={`https://crud-bookapplication-2.onrender.com/uploads/${item.thumbnail}`} alt={item.title} />
                                <h3>{item.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Book
