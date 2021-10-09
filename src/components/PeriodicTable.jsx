import React from 'react';
import '../styles/PeriodicTable.css';
import Container from 'react-bootstrap/Container';
import { useState } from "react";
import elementsData from '../data/PeriodTableData.json';
// IMAGENES
import element_overview from '../images/research.svg';
import properties from '../images/flask.svg';
import reactive from '../images/reactivo.svg';

const PeriodicTable = () => {
    
    const loadData = JSON.parse(JSON.stringify(elementsData)).elements;

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState("");
    const [appearance, setAppearance] = useState("");
    const [atomic_mass, setAtomic_mass] = useState(0);
    const [boil, setBoil] = useState(0);
    //const [category, setCategory] = useState("");
    const [density, setDensity] = useState(0);
    const [discovered_by, setDiscovered_by] = useState("");
    const [melt, setMelt] = useState(0);
    const [molar_heat, setMolar_heat] = useState("");
    const [named_by, setNamed_by] = useState("");
    let [numero, setNumero] = useState(0);
    const [period, setPeriod] = useState(0);
    const [phase, setPhase] = useState("");
    //const [source, setSource] = useState("");
    const [summary, setSummary] = useState("");
    const [simbolo, setSimbolo] = useState("");
    const [confgElect, setConfgElect] = useState("");
    const [electron_aff, setElectron_aff] = useState(0);
    const [electron_pauling, setElectron_pauling] = useState(0);
    const [shells, setShells] = useState(0);
    const [group, setGroup] = useState(0);

    let [prevName, setPrevName] = useState("");
    let [postName, setPostName] = useState("");
    
    const handleButtonClick = (e) => {
        let atmNumber = parseInt(e.target.querySelector(".at_num").textContent);
        getElementData(atmNumber);
        setShowModal(true);
    }

    const handleButtonClickLArrow = (e) => {
        if(numero === 1)
        {
            numero = 118;
        }
        else
        {
            numero = numero - 1;
        }
        getElementData(numero);
    }

    const handleButtonClickRArrow = (e) => {
        if(numero === 118)
        {
            numero = 1;
        }
        else
        {
            numero = numero + 1;
        }
        getElementData(numero);
    }

    const handleModalClick = () => {
        setShowModal(false);
    }

    const handleChildClick = (e) => {
        e.stopPropagation();
    }

    const getElementData = (number) => {
        let data = loadData.find(data => data.number === number);
        if(number === 1)
        {
            setPrevName(loadData.find(data => data.number === 118).name);
            setPostName(loadData.find(data => data.number === number+1).name);
        }
        else if(number === 118){
            setPrevName(loadData.find(data => data.number === number-1).name);
            setPostName(loadData.find(data => data.number === 1).name);
        }
        else{
            setPrevName(loadData.find(data => data.number === number-1).name);
            setPostName(loadData.find(data => data.number === number+1).name);
        }       

        setName(data.name);
        setSimbolo(data.symbol);
        setSummary(data.summary);
        setDiscovered_by(data.discovered_by);
        setNamed_by(data.named_by);
        setAppearance(data.appearance);
        setShells(data.shells);
        setNumero(data.number);
        setAtomic_mass(data.atomic_mass);
        setDensity(data.density);
        setPhase(data.phase);
        setMelt(data.melt);
        setBoil(data.boil);
        setMolar_heat(data.molar_heat);
        setGroup(data.xpos);
        setPeriod(data.period);
        setConfgElect(data.electron_configuration);
        setElectron_pauling(data.electronegativity_pauling);
        setElectron_aff(data.electron_affinity);
    }

    return (
        <Container>

            {
                showModal ?
                <div className="modalBG" onClick={handleModalClick}>
                    <div className="modalDetail" onClick={handleChildClick}>

                        <div className="rowsHeader flex-row">
                            <div className="btnNextElement lastBtn" onClick={handleButtonClickLArrow}>
                                <div>{prevName}</div>
                            </div>
                            <div className="btnNextElement nextBtn" onClick={handleButtonClickRArrow}>
                                <div>{postName}</div>
                            </div>
                        </div>

                        <div className="pt-det-group-label flex-row">
                            <img className="el_overview" src={element_overview} alt="element_overview"/>
                            <div className="pt-det-group-name">Visión general</div>
                        </div>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Nombre: </label>
                            <div className="pt-det-element-info-value">{name}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Descripción: </label>
                            <div className="pt-det-element-info-value">{summary}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Descubierto por: </label>
                            <div className="pt-det-element-info-value">{discovered_by}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Nombrado por: </label>
                            <div className="pt-det-element-info-value">{named_by}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Apariencia: </label>
                            <div className="pt-det-element-info-value">{appearance}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Capa electrónica: </label>
                            <div className="pt-det-element-info-value">{shells}</div>
                        </aside>
                        <div className="pt-det-group-label flex-row">
                            <img className="el_overview" src={properties} alt="properties"/>
                            <div className="pt-det-group-name">Propiedades</div>
                        </div>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Número atómico: </label>
                            <div className="pt-det-element-info-value">{numero}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Masa atómica: </label>
                            <div className="pt-det-element-info-value">{atomic_mass} (g/mol)</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Densidad: </label>
                            <div className="pt-det-element-info-value">{density} (g/cm³)</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Fase: </label>
                            <div className="pt-det-element-info-value">{phase}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Punto de fusión: </label>
                            <div className="pt-det-element-info-value">{melt} K</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Capacidad calorífica molar: </label>
                            <div className="pt-det-element-info-value">{molar_heat} J/(mol·K)</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Grupo: </label>
                            <div className="pt-det-element-info-value">{group}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Periodo: </label>
                            <div className="pt-det-element-info-value">{period}</div>
                        </aside>
                        <div className="pt-det-group-label flex-row">
                            <img className="el_overview" src={properties} alt="atomic_properties"/>
                            <div className="pt-det-group-name">Propiedades atómicas</div>
                        </div>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Configuración electrónica: </label>
                            <div className="pt-det-element-info-value">{confgElect}</div>
                        </aside>
                        <div className="pt-det-group-label flex-row">
                            <img className="el_overview" src={reactive} alt="atomic_properties"/>
                            <div className="pt-det-group-name">Reactividad</div>
                        </div>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Electronegatividad: </label>
                            <div className="pt-det-element-info-value">{electron_pauling}</div>
                        </aside>
                        <aside className="pt-det-element-info-box">
                            <label className="label-data">Afinidad electrónica: </label>
                            <div className="pt-det-element-info-value">{electron_aff}</div>
                        </aside>
                    </div>
                </div>
                :
                null
            }

            <div className="periodic">
                <div className="periodic-row">
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element type-4 cat-3">
                            <div className="at_num">1</div>
                            <div className="symbol">H</div>
                            <div className="at_details">Hidrógeno</div>
                        </div>
                    </div>               
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element type-2 cat-3">
                            <div className="at_num">2</div>
                            <div className="symbol">He</div>
                            <div className="at_details">Helio</div>
                        </div>
                    </div>
                </div>
                <div className="periodic-row">
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element type-2 cat-3">
                            <div className="at_num">3</div>
                            <div className="symbol">Li</div>
                            <div className="at_details">lithium</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element type-5 cat-2">
                            <div className="at_num">4</div>
                            <div className="symbol">Be</div>
                            <div className="at_details">Berilio</div>
                        </div>
                    </div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty">
                        {/* <div className="cell1">
                            <div className="element">
                                <div className="masa">55.845</div>
                                <div className="at_num">26</div>
                                <div className="ener">762.5</div>
                                <div className="elec">1.83</div>
                                <div className="estad">
                                    <li>+6</li>
                                    <li>+5</li>
                                    <li>+4</li>
                                    <li>+3</li>
                                    <li>+2</li>
                                    <li>+1</li>
                                    <li>-1</li>
                                    <li>-2</li>
                                </div>
                                <div className="symbol">Fe</div>
                                <div className="at_details">
                                    Hierro
                                    <br />
                                    [Ar]3d<sup>6</sup>4s<sup>2</sup>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">5</div>
                            <div className="symbol">B</div>
                            <div className="at_details">Boro</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">6</div>
                            <div className="symbol">C</div>
                            <div className="at_details">Carbono</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">7</div>
                            <div className="symbol">N</div>
                            <div className="at_details">Nitrógeno</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">8</div>
                            <div className="symbol">O</div>
                            <div className="at_details">Oxígeno</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">9</div>
                            <div className="symbol">F</div>
                            <div className="at_details">Flúor</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">10</div>
                            <div className="symbol">Ne</div>
                            <div className="at_details">Neón</div>
                        </div>
                    </div>
                </div>
                <div className="periodic-row">
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">11</div>
                            <div className="symbol">Na</div>
                            <div className="at_details">Sodio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">12</div>
                            <div className="symbol">Mg</div>
                            <div className="at_details">Magnesia</div>
                        </div>
                    </div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">13</div>
                            <div className="symbol">Al</div>
                            <div className="at_details">Aluminio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">14</div>
                            <div className="symbol">Si</div>
                            <div className="at_details">Silicon</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">15</div>
                            <div className="symbol">P</div>
                            <div className="at_details">Fósforo</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">16</div>
                            <div className="symbol">S</div>
                            <div className="at_details">Azufre</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">17</div>
                            <div className="symbol">Cl</div>
                            <div className="at_details">Cloro</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">18</div>
                            <div className="symbol">Ar</div>
                            <div className="at_details">Aegón</div>
                        </div>
                    </div>
                </div>
                <div className="periodic-row">
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">19</div>
                            <div className="symbol">K</div>
                            <div className="at_details">Potasio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">20</div>
                            <div className="symbol">Ca</div>
                            <div className="at_details">Calcio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">21</div>
                            <div className="symbol">Sc</div>
                            <div className="at_details">Escandio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">22</div>
                            <div className="symbol">Ti</div>
                            <div className="at_details">Titanio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">23</div>
                            <div className="symbol">V</div>
                            <div className="at_details">Vanadio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">24</div>
                            <div className="symbol">Cr</div>
                            <div className="at_details">Cromo</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">25</div>
                            <div className="symbol">Mn</div>
                            <div className="at_details">Manganeso</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">26</div>
                            <div className="symbol">Fe</div>
                            <div className="at_details">Hierro</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">27</div>
                            <div className="symbol">Co</div>
                            <div className="at_details">Cobalto</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">28</div>
                            <div className="symbol">Ni</div>
                            <div className="at_details">Níquel</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">29</div>
                            <div className="symbol">Cu</div>
                            <div className="at_details">Cobre</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">30</div>
                            <div className="symbol">Zn</div>
                            <div className="at_details">Zinc</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">31</div>
                            <div className="symbol">Ga</div>
                            <div className="at_details">Galio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">32</div>
                            <div className="symbol">Ge</div>
                            <div className="at_details">Germanio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">33</div>
                            <div className="symbol">As</div>
                            <div className="at_details">Arsénico</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">34</div>
                            <div className="symbol">Se</div>
                            <div className="at_details">Selenio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">35</div>
                            <div className="symbol">Br</div>
                            <div className="at_details">Bromo</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">36</div>
                            <div className="symbol">Kr</div>
                            <div className="at_details">Kriptón</div>
                        </div>
                    </div>
                </div>
                <div className="periodic-row">
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">37</div>
                            <div className="symbol">Rb</div>
                            <div className="at_details">Rubidio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">38</div>
                            <div className="symbol">Sr</div>
                            <div className="at_details">Estroncio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">39</div>
                            <div className="symbol">Y</div>
                            <div className="at_details">Itrio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">40</div>
                            <div className="symbol">Zr</div>
                            <div className="at_details">Zirconio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">41</div>
                            <div className="symbol">Nb</div>
                            <div className="at_details">Niobio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">42</div>
                            <div className="symbol">Mo</div>
                            <div className="at_details">Molibdeno</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">43</div>
                            <div className="symbol">Tc</div>
                            <div className="at_details">Tecnecio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">44</div>
                            <div className="symbol">Ru</div>
                            <div className="at_details">Rutenio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">45</div>
                            <div className="symbol">Rh</div>
                            <div className="at_details">Rodio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">46</div>
                            <div className="symbol">Pd</div>
                            <div className="at_details">Paladio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">47</div>
                            <div className="symbol">Ag</div>
                            <div className="at_details">Plata</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">48</div>
                            <div className="symbol">Cd</div>
                            <div className="at_details">Cadmio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">49</div>
                            <div className="symbol">In</div>
                            <div className="at_details">Indio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">50</div>
                            <div className="symbol">Sn</div>
                            <div className="at_details">Estaño</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">51</div>
                            <div className="symbol">Sb</div>
                            <div className="at_details">Antimonio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">52</div>
                            <div className="symbol">Te</div>
                            <div className="at_details">Telurio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">53</div>
                            <div className="symbol">I</div>
                            <div className="at_details">Yodo</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">54</div>
                            <div className="symbol">Xe</div>
                            <div className="at_details">Xenón</div>
                        </div>
                    </div>
                </div>
                <div className="periodic-row">
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">55</div>
                            <div className="symbol">Cs</div>
                            <div className="at_details">Cesio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">56</div>
                            <div className="symbol">Ba</div>
                            <div className="at_details">Bario</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">71</div>
                            <div className="symbol">Lu</div>
                            <div className="at_details">Lutecio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">72</div>
                            <div className="symbol">Hf</div>
                            <div className="at_details">Hafnio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">73</div>
                            <div className="symbol">Ta</div>
                            <div className="at_details">Tantalio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">74</div>
                            <div className="symbol">W</div>
                            <div className="at_details">Wolframio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">75</div>
                            <div className="symbol">Re</div>
                            <div className="at_details">Renio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">76</div>
                            <div className="symbol">Os</div>
                            <div className="at_details">Osmio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">77</div>
                            <div className="symbol">Ir</div>
                            <div className="at_details">Iridio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">78</div>
                            <div className="symbol">Pt</div>
                            <div className="at_details">Platino</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">79</div>
                            <div className="symbol">Au</div>
                            <div className="at_details">Oro</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">80</div>
                            <div className="symbol">Hg</div>
                            <div className="at_details">Mercurio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">81</div>
                            <div className="symbol">Tl</div>
                            <div className="at_details">Talio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">82</div>
                            <div className="symbol">Pb</div>
                            <div className="at_details">Plomo</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">83</div>
                            <div className="symbol">Bi</div>
                            <div className="at_details">Bismuto</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">84</div>
                            <div className="symbol">Po</div>
                            <div className="at_details">Polonio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">85</div>
                            <div className="symbol">At</div>
                            <div className="at_details">Astato</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">86</div>
                            <div className="symbol">Rn</div>
                            <div className="at_details">Radón</div>
                        </div>
                    </div>
                </div>
                <div className="periodic-row">
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">87</div>
                            <div className="symbol">Fr</div>
                            <div className="at_details">Francio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">88</div>
                            <div className="symbol">Ra</div>
                            <div className="at_details">Radio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">103</div>
                            <div className="symbol">Rf</div>
                            <div className="at_details">Laurencio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">104</div>
                            <div className="symbol">Rf</div>
                            <div className="at_details">Rutherfordio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">105</div>
                            <div className="symbol">Db</div>
                            <div className="at_details">Dubnio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">106</div>
                            <div className="symbol">Sg</div>
                            <div className="at_details">Seborgio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">107</div>
                            <div className="symbol">Bh</div>
                            <div className="at_details">Bohrio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">108</div>
                            <div className="symbol">Hs</div>
                            <div className="at_details">Hassio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">109</div>
                            <div className="symbol">Mt</div>
                            <div className="at_details">Meitnerio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">110</div>
                            <div className="symbol">Ds</div>
                            <div className="at_details">Darmstadio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">111</div>
                            <div className="symbol">Rg</div>
                            <div className="at_details">Roentgenio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">112</div>
                            <div className="symbol">Cn</div>
                            <div className="at_details">Copernicio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">113</div>
                            <div className="symbol">Uut</div>
                            <div className="at_details">Ununtrio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">114</div>
                            <div className="symbol">Fl</div>
                            <div className="at_details">Flerovio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">115</div>
                            <div className="symbol">Uup</div>
                            <div className="at_details">Unumpentio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">116</div>
                            <div className="symbol">Lv</div>
                            <div className="at_details">Livermorio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">117</div>
                            <div className="symbol">Uus</div>
                            <div className="at_details">Ununseptio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">118</div>
                            <div className="symbol">Uuo</div>
                            <div className="at_details">Ununoctio</div>
                        </div>
                    </div>
                </div>
                <div className="periodic-row"></div>
                <div className="periodic-row">
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">57</div>
                            <div className="symbol">La</div>
                            <div className="at_details">Lantano</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">58</div>
                            <div className="symbol">Ce</div>
                            <div className="at_details">Cerio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">59</div>
                            <div className="symbol">Pr</div>
                            <div className="at_details">Praseodimio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">60</div>
                            <div className="symbol">Nd</div>
                            <div className="at_details">Neodimio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">61</div>
                            <div className="symbol">Pm</div>
                            <div className="at_details">Prometio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">62</div>
                            <div className="symbol">Sm</div>
                            <div className="at_details">Samario</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">63</div>
                            <div className="symbol">Eu</div>
                            <div className="at_details">Europio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">64</div>
                            <div className="symbol">Gd</div>
                            <div className="at_details">Gadolinio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">65</div>
                            <div className="symbol">Tb</div>
                            <div className="at_details">Terbio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">66</div>
                            <div className="symbol">Dy</div>
                            <div className="at_details">Disprosio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">67</div>
                            <div className="symbol">Ho</div>
                            <div className="at_details">Holmio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">68</div>
                            <div className="symbol">Er</div>
                            <div className="at_details">Erbio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">69</div>
                            <div className="symbol">Tm</div>
                            <div className="at_details">Tulio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">70</div>
                            <div className="symbol">Yb</div>
                            <div className="at_details">Iterbio</div>
                        </div>
                    </div>
                    <div className="cell_empty"></div>
                </div>
                <div className="periodic-row">
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell_empty"></div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">89</div>
                            <div className="symbol">Ac</div>
                            <div className="at_details">Actinio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">90</div>
                            <div className="symbol">Th</div>
                            <div className="at_details">Torio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">91</div>
                            <div className="symbol">Pa</div>
                            <div className="at_details">Protactinio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">92</div>
                            <div className="symbol">U</div>
                            <div className="at_details">Uranio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">93</div>
                            <div className="symbol">Np</div>
                            <div className="at_details">Neptunio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">94</div>
                            <div className="symbol">Pu</div>
                            <div className="at_details">Plutonio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">95</div>
                            <div className="symbol">Am</div>
                            <div className="at_details">Americio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">96</div>
                            <div className="symbol">Cm</div>
                            <div className="at_details">Curio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">97</div>
                            <div className="symbol">Bk</div>
                            <div className="at_details">Berkelio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">98</div>
                            <div className="symbol">Cf</div>
                            <div className="at_details">Californio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">99</div>
                            <div className="symbol">Es</div>
                            <div className="at_details">Einstenio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">100</div>
                            <div className="symbol">Fm</div>
                            <div className="at_details">Fermio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">101</div>
                            <div className="symbol">Md</div>
                            <div className="at_details">Mendelevio</div>
                        </div>
                    </div>
                    <div className="cell" onClick= {handleButtonClick}>
                        <div className="element">
                            <div className="at_num">102</div>
                            <div className="symbol">No</div>
                            <div className="at_details">Nobelio</div>
                        </div>
                    </div>
                    <div className="cell_empty"></div>
                </div>
            </div>

        </Container>
    );
};

export default PeriodicTable;
