import styles from './SearchItem.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import { useEffect, useState } from 'react';
import useTelegram from '../../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';

var prev = 0;

function SearchItem() {
    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState("");
    const [selectInput, setSelectInput] = useState("");

    const {initData} = useTelegram();

    const [optionList, setOptionList] = useState([]);

    // const optionList = [
    //     { value: "red", label: "Red" },
    //     { value: "green", label: "Green" },
    //     { value: "yellow", label: "Yellow" },
    //     { value: "blue", label: "Blue" },
    //     { value: "white", label: "White" }
    //   ];
    
    function handleSelect(data) {
        setSelectedOptions(data);
        navigate('/home/product/', { state: { variant_id: data.value, variant_name: data.label, category_id: -1 } });
    }

    const fetchData = (it) => {
        fetch("https://octopus-vape.ru/products/catalog/search/?query=" + selectInput, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            if (prev <= it) {
              var list = [];
              data.forEach(function(entry) {
                  list.push({value: entry.variant_id, label: entry.name})
              });
              setOptionList(list);
              // console.log(data.headers.entries()); 
            }
        })
    }

    function handleInput(data) {
          setSelectInput(data);
          prev += 1;
          if (data.length >= 2) {  
            fetchData(prev);
          }
        
    }
    
    useEffect(() => {
      const container = document.getElementsByClassName('react-select__control')[0];
      // then apply some styles to it
      container.style.minHeight = '28px';
      const searchText = document.getElementsByClassName('react-select__placeholder')[0];
      // then apply some styles to it
      searchText.style.Height = '14px';
    }, [])

    console.log(selectedOptions);
    console.log(optionList);
      console.log(selectInput);
      return (
        <div className={styles.root} >
          <div className={styles.dropdowncontainer}>
            <Select
              options={optionList}
              placeholder={<div className={styles.placeholder}>
                <AiOutlineSearch  className={styles.SearchIcon}/>
                <span className={styles.SearchText}>Найти</span>
              </div>}
              value={selectInput}
              onChange={handleSelect}
              inputValue={selectInput}
              onInputChange={handleInput}
              isSearchable={true}
              filterOption={null}
              blurInputOnSelect={true}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          </div>
      );
}

export default SearchItem