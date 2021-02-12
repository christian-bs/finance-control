import React /*, { useEffect }*/ from 'react';
//import M from 'materialize-css';

const YEARS = [2019, 2020, 2021];

const MONTHS = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dez',
};

const formatLeadingZeros = (number, qty) => {
    return number.toString().padStart(qty, '0');
};

const PeriodSelector = ({ selectedMonth, handleOnChange }) => {
    // useEffect(() => {
    //     M.AutoInit();
    // }, []);

    const handleSelectChange = ({ target }) => {
        handleOnChange(target.value);
    };

    return (
        <select
            className="browser-default"
            defaultValue={selectedMonth}
            onChange={handleSelectChange}
        >
            {YEARS.map((year, mapIndex) => {
                let options = [];
                for (let index = 1; index <= 12; index++) {
                    let id = `${mapIndex} ${year}_${index}`;
                    options.push(
                        <option
                            key={id}
                            value={`${year}-${formatLeadingZeros(index, 2)}`}
                            // selected={
                            //     selectedMonth ===
                            //         `${year}-${formatLeadingZeros(index, 2)}` &&
                            //     true
                            // }
                        >
                            {`${MONTHS[index]}/${year}`}
                        </option>
                    );
                }
                return options;
            })}
        </select>
    );
};

export default PeriodSelector;
