import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../assets/phone.png';
import CommentPost from '../components/CommentPost';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import UserItem from '../components/UserItem';
import { getListPostStart } from '../redux/posts/postAction';
import { IFollowPerson } from '../redux/users/userActions';
import './Home.scss';
function Home() {
  const [isForm, setIsForm] = useState(false);
  const [isPostView, setIsPostView] = useState(false);
  const [postSelected, setPostSelected] = useState({});

  const { token, user, followings } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getListPostStart(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(IFollowPerson({ id: user._id, token }));
  }, [dispatch, token, user]);
  const openForm = () => {
    setIsForm(true);
  };

  const closeForm = () => {
    setIsForm(false);
  };

  const handleShowViewPost = () => {
    setIsPostView(!isPostView);
  };
  //setPostId  when click "View all comment" to show Post detail
  const selectViewPostComment = (post) => {
    setPostSelected(post);
  };
  return (
    <div className=' grid grid-5-4 home  '>
      <div className='p-3'>
        <ul className='story d-flex flex-no-wrap'>
          <li className='story__item d-flex flex-column '>
            <img src={avatar} alt='' className='circle avatar-large' />
            <span>HiHi</span>
          </li>
        </ul>
        {post.map((item) => {
          return (
            <PostItem
              handleShowViewPost={handleShowViewPost}
              selectViewPostComment={selectViewPostComment}
              post={item}
              key={item._id}
            />
          );
        })}
      </div>
      <div className='post m-3'>
        <button onClick={() => openForm()} className='btn btn-primary'>
          New post
        </button>
        <div className='me mt-3'>
          <UserItem account={true} useritem={user} />
        </div>
        <div className='suggest'>
          <h6>Following</h6>
          {followings.map((user) => {
            return <UserItem key={user._id} account={false} useritem={user} />;
          })}
        </div>
      </div>
      {isForm ? <PostForm closeForm={closeForm} /> : null}
      {isPostView ? (
        <CommentPost postSelected={postSelected} handleShowViewPost={handleShowViewPost} />
      ) : null}
    </div>
  );
}

export default Home;
