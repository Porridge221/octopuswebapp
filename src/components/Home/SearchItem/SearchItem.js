import styles from './SearchItem.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import { useState } from 'react';
import useTelegram from '../../../hooks/useTelegram';
import { useNavigate, useLocation } from 'react-router-dom';

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
        navigate('/home/product/', { state: { variant_id: data.value, variant_name: data.label } });
    }

    const fetchData = () => {
        fetch("https://octopus-vape.ru/products/catalog/search/?query=" + selectInput, {method: 'GET', headers: {'Content-Type': 'application/json', 'Telegram-Data': initData,}})
          .then(response => {
            return response.json()
          })
          .then(data => {
            var list = [];
            data.forEach(function(entry) {
                list.push({value: entry.variant_id, label: entry.name})
            });
            setOptionList(list);
        })
    }

    function handleInput(data) {
        setSelectInput(data);
        if (data.length > 2)
            return fetchData
    }

    console.log(selectedOptions);
    console.log(optionList);
      console.log(selectInput);
      return (
        <div className={styles.root} >
          <div className={styles.dropdowncontainer}>
            <Select
              options={optionList}
              placeholder="Найти"
              value={selectedOptions}
              onChange={handleSelect}
              onInputChange={handleInput}
              isSearchable={true}
            />
          </div>
          </div>
      );
}

export default SearchItem