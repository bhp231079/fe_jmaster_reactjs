import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
function CPost(props) {

    let {allpost} = useSelector(state => state.postReducer)
    
    return (
        <>
            <div className='row mt-5'>
                <div className='col-12 '>
                    <h3 className='d-4'>Danh sách bài post</h3>


                </div>
            </div>
            <div className='row mt-5'>
                {allpost?.data?.map((item, index) => {
                    return <div className='card border-primary col-3 pt-4' style={{ margin: 30 }} key={item.id}>
                        <img style={{ maxWidth: 350, maxHeight: 300 }} src={`http://54.150.115.104:8080/image/${item.images}`} />
                        <div className="card-body">
                            <h4 className="card-title">{item.title}</h4>
                            <div>{ReactHtmlParser(item.description)}</div>   
                            <Link to={`/post/detai/${item.id}`}>Xem chi tiết</Link>
                        </div>
                    </div>
                })}

            </div>
        </>
    );
}

export default CPost;