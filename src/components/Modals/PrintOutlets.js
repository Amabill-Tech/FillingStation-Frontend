import React, {useRef} from 'react';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useState } from 'react';
import { ThreeDots } from  'react-loader-spinner';

const mediaMatch = window.matchMedia('(max-width: 1000px)');

const PrintOutLetsModal = (props) => {
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
                <div style={tableHead} className='table-head'>
                    <div style={column} className='column'>S/N</div>
                    <div style={column} className='column'>Licence Code</div>
                    <div style={column} className='column'>Name</div>
                    <div style={column} className='column'>Outlet Code</div>
                    <div style={column} className='column'>No of Tanks</div>
                    <div style={column} className='column'>No of Pumps</div>
                    <div style={column} className='column'>State</div>
                    <div style={column} className='column'>City/Town</div>
                </div>
        
                {
                    props.allOutlets.length === 0?
                    <div style={place}>No data</div>:
                    props.allOutlets.map((item, index) => {
                        return(
                            <div key={index} className='row-container'>
                                <div style={tableHead2} className='table-head2'>
                                    <div style={column2} className='column'>{index + 1}</div>
                                    <div style={column2} className='column'>{item.licenseCode}</div>
                                    <div style={column2} className='column'>{item.outletName}</div>
                                    <div style={column2} className='column'>{item._id}</div>
                                    <div style={column2} className='column'>{item.noOfTanks}</div>
                                    <div style={column2} className='column'>{item.noOfPumps}</div>
                                    <div style={column2} className='column'>{item.city}</div>
                                    <div style={column2} className='column'>{item.state}</div>
                                </div>
                            </div>
                        )
                    })
                }
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
                <div style={{position:'absolute', zIndex:'10'}}>
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
    zIndex:'20'
}

const contain = {
    width:'100%', 
    height:'100vh', 
    display:'flex', 
    justifyContent:'center',
    alignItems:'center', 
    position:'relative'
}

const tableContainer = {
    width: '100%',
    minWidth: '980px',
    height: 'auto',
    margintop: '20px',
}

const tableHead = {
    width: '100%',
    height: '35px',
    backgroundColor: '#525252',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '4px',
}

const tableHead2 = {
    width: '100%',
    height: '50px',
    backgroundColor: '#EDEDED',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '4px',
    marginTop: '5px',
}

const column = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: '14px'
}

const column2 = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontFamily: 'Nunito-Regular',
    fontSize: '14px'
}

const place = {
    width:'100%',
    textAlign:'center',
    fontSize:'14px',
    fontFamily:'Nunito-Regular',
    marginTop:'20px',
    color:'green'
}

export default PrintOutLetsModal;