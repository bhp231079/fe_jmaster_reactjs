import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailPostAction } from '../../redux/actions/PostAction';
import ReactHtmlParser from 'react-html-parser';
import { Avatar, Button, Comment, Form, Input } from 'antd';
import { userInfo } from '../../utils/systemSetting';
import { addCommentAction, getAllCommentAction } from '../../redux/actions/CommentAction';
const { TextArea } = Input;
function DetailPost(props) {

    const id = useParams();
    const dispatch = useDispatch();
    const { detailPost } = useSelector(state => state.postReducer);
    const user = JSON.parse(localStorage.getItem(userInfo))
    const [state, setState] = useState({
        userId: user?.id,
        postId: id?.id,
        content: ''
    })
    const {comments} = useSelector(state=> state.commentReducer)
    console.log(comments?.data);
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })

    }
    const handleSubmit = () => {
        dispatch(addCommentAction(state))
    }
    useEffect(() => {
        dispatch(detailPostAction(id.id))
        dispatch(getAllCommentAction({
                "start": 0,
                "length": 100,
                "postId": id?.id,
                "search": {
                    "value": ""
                }
        }))
}, [])
return (
    <>
        <div className='row mt-5'>
            <div className='col-12 '>
                <h3 className='d-4 text-center'>{detailPost?.title}</h3>

            </div>
        </div>
        <div className='row mt-5'>
            <div className='col-6 '>
                <h3 className='d-4 text-center'>{detailPost?.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ maxWidth: 1500, maxHeight: 1500 }} src={`http://54.150.115.104:8080/image/${detailPost?.images}`} alt={'hhuhu'} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {ReactHtmlParser(detailPost?.description)}</div>
            </div>
            <div className='col-6 '>
                <h3 className='d-4 text-center'>Nhận xét/ Góp ý</h3>
                <div>
                    <div className='row' style={{ width: 500, height: 500 }}>
                        Đánh giá của các độc giả
                        {comments?.data?.map((item,index)=> {
                            return <Comment key={item.id} style={{width: 500}}

                            author={<div>Nguời dùng : <a>{item.userId}</a></div>}
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                            content={
                                <p> {item.content}
                                </p>
                            }

                        />
                        })}
                        
                        
                    </div>
                    <div className='row'>
                        <Form layout="horizontal" onFinish={handleSubmit} >
                            <Form.Item label="Bình luận của bạn">
                                <TextArea name='content' rows={4} cols={100} placeholder={'Bình luận của bạn về bài viết này...'} onChange={handleChange} />
                            </Form.Item>
                            <Form.Item style={{ paddingLeft: 150 }}>
                                <Button htmlType='submit'>Thêm bình luận</Button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>

            </div>
        </div>


    </>
);
}

export default DetailPost;