import styles from './SearchItem.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import { useEffect, useState } from 'react';
import useTelegram from '../../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';

// import {Dropdown} from 'react-searchable-dropdown-component';
import SelectableSearch from "@fliptask/react-search-dropdown";

import {AiOutlineClose} from "react-icons/ai";

var prev = 0;

function SearchItem() {
    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState("");
    const [selectInput, setSelectInput] = useState({search: '', list: []});
    const [isOpen, setIsOpen] = useState(false);

    const {initData} = useTelegram();

    const [optionList, setOptionList] = useState([]);

    const optionList1 = [
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "white", label: "White" }
      ];
    
    function handleSelect(event, selectedOption) {
        setSelectedOptions(selectedOption);
        navigate('/home/product/', { state: { variant_id: selectedOption.value, variant_name: selectedOption.label, category_id: -1 } });
    }

  //   function handleSelect(event, selectedOption) {
  //     console.log(event);
  //     console.log(selectedOption);
  // }

    const fetchData = (it) => {
        fetch("https://octopus-vape.ru/products/catalog/search/?query=" + selectInput['search'], {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            console.log(response.status);
            return response.status === 200 ? response.json() : []
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
      console.log(selectInput);
          setSelectInput(data);
          prev += 1;
          if (data?.search && data['search'].length >= 2) {  
            fetchData(prev);
          }
        
    }

    function handleFocus() {
      console.log(optionList);
          optionList && optionList?.length > 0 && setIsOpen(true)
    }
    
    useEffect(() => {
      // const container = document.getElementsByClassName('react-select__control')[0];
      // // then apply some styles to it
      // container.style.minHeight = '28px';
      // const searchText = document.getElementsByClassName('react-select__placeholder')[0];
      // // then apply some styles to it
      // searchText.style.Height = '14px';
    }, [])

      return (
        <div className={styles.root} >
          <div className={styles.dropdowncontainer}>
            {/* <Select
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
            /> */}
            <SelectableSearch
                    value={selectInput['search']}
                    placeholder={'Найти'}
                    options={optionList}
                    open={isOpen}
                    onChange={handleInput}
                    onSelected={handleSelect}
                    searchKeys={["label"]}
                    onFocus={handleFocus}
                    className={'dropdown'}
                />
            <div style={{position: 'absolute', height: '100%', right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px'}} onClick={() => setIsOpen(!isOpen)} >
              <AiOutlineClose style={{width: '20px', height: '20px'}} />
            </div>
          </div>
          </div>
      );
}

export default SearchItem