import React, {useRef} from 'react';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useState } from 'react';
import { ThreeDots } from  'react-loader-spinner';
import avatar from '../../assets/avatar.png';
import ComprehensiveReport from '../DailySales/ComprehensiveReport';


const mediaMatch = window.matchMedia('(max-width: 1000px)');

const LeftTableView = () => {

    return(
        <div style={columnHead1}>
            <div style={header1}>
                <span style={{marginLeft:'10px'}}>Balance B/Forward</span>
            </div>
            <div style={rowCont}>
                <div style={rows}>
                    <div style={cell}>Product Type</div>
                    <div style={{...cell, marginRight:'0px'}}>Litre Qty</div>
                </div>

                <div style={rows}>
                    <div style={{...cell, color:'#06805B', fontSize:'11px'}} className='cell'>PMS</div>
                    <div style={{...cell, marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                </div>

                <div style={rows}>
                    <div style={{...cell, color:'#06805B', fontSize:'11px'}} className='cell'>AGO</div>
                    <div style={{...cell, marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                </div>

                <div style={rows}>
                    <div style={{...cell, color:'#06805B', fontSize:'11px'}} className='cell'>DPK</div>
                    <div style={{...cell, marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                </div>
            </div>
        </div>
    )
}

const MiddleTableView = () => {
    return(
        <div style={columnHead2}>
            <div style={header2}>
                <span style={{marginLeft:'10px'}}>Supply</span>
            </div>
            <div style={rowCont}>
                <div style={rows}>
                    <div style={cell}>Product Type</div>
                    <div style={cell}>Truck No</div>
                    <div style={cell}>Litre Qty</div>
                    <div style={cell}>Transportation</div>
                    <div style={{...cell, marginRight:'0px'}}>Shortage</div>
                </div>

                <div style={rows}>
                    <div style={{...cell, color:'#06805B', fontSize:'11px'}} >PMS</div>
                    <div style={{...cell, fontSize:'11px'}} >Truck No</div>
                    <div style={{...cell, fontSize:'11px'}} >Litre Qty</div>
                    <div style={{...cell, fontSize:'11px'}} ></div>
                    <div style={{...cell, marginRight:'0px', fontSize:'11px'}} >Shortage</div>
                </div>

                <div style={rows}>
                    <div style={{...cell, color:'#06805B', fontSize:'11px'}}>AGO</div>
                    <div style={{...cell, fontSize:'11px'}}>Truck No</div>
                    <div style={{...cell, fontSize:'11px'}}>Litre Qty</div>
                    <div style={{...cell, fontSize:'11px'}}></div>
                    <div style={{...cell, marginRight:'0px', fontSize:'11px'}}>Shortage</div>
                </div>

                <div style={rows}>
                    <div style={{...cell, color:'#06805B', fontSize:'11px'}}>AGO</div>
                    <div style={{...cell, fontSize:'11px'}}>Truck No</div>
                    <div style={{...cell, fontSize:'11px'}}>Litre Qty</div>
                    <div style={{...cell, fontSize:'11px'}}></div>
                    <div style={{...cell, marginRight:'0px', fontSize:'11px'}}>Shortage</div>
                </div>
            </div>
        </div>
    )
}

const RightTableView = () => {
    return(
        <div style={{...columnHead1, marginRight:'0px', marginLeft:'5px'}}>
            <div style={header1}>
                <span style={{marginLeft:'10px'}}>Available Balance</span>
            </div>
            <div style={rowCont}>
                <div style={rowCont}>
                    <div style={rows}>
                        <div style={cell}>Product Type</div>
                        <div style={{...cell, marginRight:'0px'}}>Litre Qty</div>
                    </div>

                    <div style={rows}>
                        <div style={{...cell, color:'#06805B', fontSize:'11px'}} >PMS</div>
                        <div style={{...cell, marginRight:'0px', fontSize:'11px'}} >4,234.00</div>
                    </div>

                    <div style={rows}>
                        <div style={{...cell, color:'#06805B', fontSize:'11px'}} >AGO</div>
                        <div style={{...cell, marginRight:'0px', fontSize:'11px'}} >4,234.00</div>
                    </div>

                    <div style={rows}>
                        <div style={{...cell, color:'#06805B', fontSize:'11px'}}>DPK</div>
                        <div style={{...cell, marginRight:'0px', fontSize:'11px'}}>4,234.00</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PMSDailySales = (props) => {
    return(
        <div style={mainSales}>
            <div style={inner}>
                <div style={tableHeads}>
                    <div style={col}>{props.name}</div>
                    <div style={col}>Opening</div>
                    <div style={col}>Closing</div>
                    <div style={col}>Difference</div>
                    <div style={col}>LPO</div>
                    <div style={col}>Rate</div>
                    <div style={col}>R/T</div>
                    <div style={{...col, marginRight:'0px'}}>Amount</div>
                </div>

                {
                    props.data.rows.length === 0?
                    <div style={dats}> No Data </div>:
                    props.data.rows.map(data => {
                        return(
                            <div style={tableHeads2}>
                                <div style={col2}>{data.pumpName}</div>
                                <div style={col2}>{data.openingMeter}</div>
                                <div style={col2}>{data.closingMeter}</div>
                                <div style={col2}>{Number(data.closingMeter) - Number(data.openingMeter)}</div>
                                <div style={col2}>{data.lpoLitre}</div>
                                <div style={col2}>
                                    {data.productType === "PMS" && data.PMSRate}
                                    {data.productType === "AGO" && data.AGORate}
                                    {data.productType === "DPK" && data.DPKRate}
                                </div>
                                <div style={col2}>{data.rtLitre}</div>
                                <div style={{...col2, marginRight:'0px'}}>
                                    {data.productType === "PMS" && Number(data.sales)*Number(data.PMSSellingPrice) + Number(data.lpoLitre)*Number(data.PMSRate) - Number(data.rtLitre)*Number(data.PMSSellingPrice)}
                                    {data.productType === "AGO" && Number(data.sales)*Number(data.AGOSellingPrice) + Number(data.lpoLitre)*Number(data.AGORate) - Number(data.rtLitre)*Number(data.AGOSellingPrice)}
                                    {data.productType === "DPK" && Number(data.sales)*Number(data.DPKSellingPrice) + Number(data.lpoLitre)*Number(data.DPKRate) - Number(data.rtLitre)*Number(data.DPKSellingPrice)}
                                </div>
                            </div>
                        )
                    })
                }

                {
                    props.data.rows.length === 0 ||
                    <div style={tableHeads2}>
                        <div style={{...col2, background: "transparent"}}></div>
                        <div style={{...col2, background: "transparent"}}></div>
                        <div style={col2}>Total</div>
                        <div style={col2}>{props.data.total.totalDifference}</div>
                        <div style={col2}>{props.data.total.totalLpo}</div>
                        <div style={col2}></div>
                        <div style={col2}>{props.data.total.totalrt}</div>
                        <div style={{...col2, marginRight:'0px'}}>{props.data.total.amount}</div>
                    </div>
                }
            </div>
        </div>
    )
}

const ComprehensiveReports = (props) => {
    const printTable = useRef();
    const iframe = useRef();
    const [dom, setDom] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        props.close(false);
    }

    const setTheDomHere = () => {
        setDom(printTable.current);
        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setTheDomHere();
        }, 3000)
    },[])

    const Table = () => {
        return(
            <div ref={printTable} style={tableContainer}>
                <div style={main}>
                    <div style={left}>
                        <div style={innerMain}>
                            <div style={tableCont}>
                                <LeftTableView />
                                <MiddleTableView />
                                <RightTableView />
                            </div>

                            <PMSDailySales name={'PMS'} data={props.data.PMS} />
                            <PMSDailySales name={'PMS'} data={props.data.AGO} />
                            <PMSDailySales name={'PMS'} data={props.data.DPK} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handlePrint = () => {
        let wspFrame = iframe.current.contentWindow;
        wspFrame.focus();
        wspFrame.print();
    }

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
            <div style={contain}>
                <div style={{position:'absolute', zIndex:'10', visibility:'hidden'}}>
                    <Table />
                </div>
                <div style={frame}>
                    <iframe ref={iframe} srcDoc={dom.outerHTML} title='documents' height="100%" width="100%" />
                    <div style={{marginTop:'10px'}}>
                        <button onClick={()=>{handlePrint()}} style={prints}>Print</button>
                        <button onClick={handleClose} style={closes}>close</button>
                    </div>
                </div>
                <ThreeDots 
                    height="60" 
                    width="50" 
                    radius="9"
                    color="#076146" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{position:'absolute', zIndex:'30'}}
                    wrapperClassName=""
                    visible={loading}
                />
            </div>
        </Modal>
    )
}

const mainSales = {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: '30px',
    marginTop:'20px'
}

const inner = {
    width: '100%',
    height: 'auto',
}

const tableHeads = {
    width: '100%',
    height: '30px',
    display: 'flex',
    flexDirection: 'row',
}

const col = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(266.48deg, #525252 8.34%, #525252 52.9%)',
    borderRadius: '4px',
    color: '#fff',
    marginRight: '5px',
    fontSize: '12px',
    fontFamily: 'Nunito-Regular',
}

const tableHeads2 = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
}

const col2 = {
    width: '100%',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#EDEDED',
    borderRadius: '4px',
    color: '#000',
    marginRight: '5px',
    fontSize: '12px',
    fontFamily: 'Nunito-Regular',
    marginTop: '5px',
}

const header2 ={
    width: '100%',
    height: '30px',
    background: 'linear-gradient(266.48deg, #525252 8.34%, #525252 52.9%)',
    borderRadius: '4px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: '12px',
}

const columnHead2 = {
    width: '60%',
    height: '100%',
    borderRadius: '4px',
}

const cell = {
    width: '100%',
    height: '30px',
    backgroundColor: '#EDEDED',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
    borderRadius: '5px',
}

const rows = {
    width: '100%',
    height: '30px',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'row',
}

const rowCont = {
    width: '100%',
    fontSize: '12px',
    color: '#000',
}

const header1 = {
    width: '100%',
    height: '30px',
    background: 'linear-gradient(266.48deg, #525252 8.34%, #525252 52.9%)',
    borderRadius: '4px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: '12px',
}

const columnHead1 = {
    width: '20%',
    height: '100%',
    borderRadius: '4px',
    marginRight: '5px',
}

const main = {
    width: '100%',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
}

const left = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F5F199',
}

const innerMain = {
    margin: '10px',
    width: '100%',
    marginTop: '10px',
}

const tableCont = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}

const prints = {
    width:'100px',
    height:'30px',
    background:'green',
    color:'#fff',
    marginRight:'20px'
}

const closes = {
    width:'100px',
    height:'30px',
    background:'red',
    color:'#fff'
}

const frame = {
    width: mediaMatch.matches? '96%': '1000px',
    height:'600px',
    background:'#fff',
    position:'absolute',
    zIndex:'20',
}

const contain = {
    width:'100%', 
    height:'100vh', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center', 
    position:'relative',
}

const tableContainer = {
    width: '100%',
    minWidth: '980px',
    height: 'auto',
    margintop: '20px',
}

const dats = {
    marginTop:'20px',
    fontSize:'14px',
    fontWeight:'bold',
    fontFamily:'Nunito-Regular'
}

export default ComprehensiveReports;