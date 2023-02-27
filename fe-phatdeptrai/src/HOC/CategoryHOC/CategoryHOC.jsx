import { Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawerAction } from '../../redux/reducers/drawerReducer';

function CategoryHOC() {

   const {visible,Component,title} = useSelector(state=> state.drawerReducer)
   
   const dispatch = useDispatch();
    return (
       <>   
         <Drawer title={title} width={720}  placement="right"  onClose={()=> {
            dispatch(hideDrawerAction())
         }} visible={visible}>
            {Component}
          </Drawer>
       </>
    );
}

export default CategoryHOC;