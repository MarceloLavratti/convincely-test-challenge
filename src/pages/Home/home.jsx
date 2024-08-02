import React, { useState, useEffect } from 'react'
import api from '../../services/provider.js'
import Header from '../../components/Header/header.jsx';
import Cards from '../../components/Cards/cards.jsx';
import './home.css'

const Home = () => {

    const [movies, setMovies] = useState([])
    const [aveRuntime, setAveRuntime] = useState('')
    const [aveBudget, setAveBudget] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [filterName, setFilterName] = useState('')

    const fetchMovies = async () => {
        try {
            const response = await api.get('/')
            const sortedMovies = response.data.docs.sort((a, b) => {
                if (selectedOption === 'name') {
                    return a.name.localeCompare(b.name)
                } else if (selectedOption === 'budget') {
                    return b.budgetInMillions - a.budgetInMillions
                }
            })
            setMovies(sortedMovies)
            handleAves()
        } catch (error) {
            console.error(error)
        }
    }

    const handleAves = () => {
        const aveB = movies.reduce((acc, item) => acc + item.budgetInMillions, 0) / movies.length
        const aveR = movies.reduce((acc, item) => acc + item.runtimeInMinutes, 0) / movies.length
        setAveBudget(aveB)
        setAveRuntime(aveR)
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const filterMovies = async (searchTerm) => {
        try {
            const response = await api.get('/')
            const filteredMovies = response.data.docs.filter((movie) => {
                return movie.name.toLowerCase().includes(searchTerm)
            })
            setMovies(filteredMovies)
        } catch (error) {
            console.error(error)
        }
    }

    const debouncedFilterMovies = debounce(filterMovies, 800)

    const handleInputChange = (e) => {
        const searchTerm = e.target.value.toLowerCase()
        setFilterName(searchTerm)
        debouncedFilterMovies(searchTerm)
    }

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value)
    }    

    useEffect(() => {
        fetchMovies()

    }, [selectedOption]);

    return (
        <div className='main-div'>
            <Header />
            <div className='title-cards-div'>
                <div className='title-div'>
                    <div className='title-avg-div'>
                        <h1>Lord of the Rings Movies</h1>
                        <span>Ave. movie runtime: {aveRuntime} min</span>
                        <span>Ave. movie budget: ${aveBudget}M</span>
                    </div>
                    <div className='filters-div'>
                        <input
                            
                            placeholder='Filter movies by name'
                            onChange={handleInputChange}
                            value={filterName}
                        />
                        <select id='select-style' value={selectedOption} onChange={handleSelectChange}>
                            <option value=''>Sort movies by</option>
                            <option value='name'>Sort by name</option>
                            <option value='budget'>Sort by budget</option>
                        </select>
                    </div>
                </div>

                <hr/>
                <Cards data={movies} />
            </div>
        </div>
    )
}

export default Home
