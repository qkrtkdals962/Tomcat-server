import React, { useState, useEffect } from 'react';
import '../styles/CommunityBoard.css'; // CSS 파일 import
import dummyData from '../data/dummyData'; // 임시 데이터 (백엔드 연동 후 삭제)

const FreeBoard = () => {
    const [posts, setPosts] = useState(dummyData); // 게시글 목록 (임시 데이터 사용)
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState({}); // { postId: [comment1, comment2, ...] }
    const [newComment, setNewComment] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('latest');
    const [isCreating, setIsCreating] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 임시 로그인 상태

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevState => ({ ...prevState, [name]: value }));
    };

    const handleTagChange = (e) => {
        setNewPost(prevState => ({ ...prevState, tags: e.target.value.split(',').map(tag => tag.trim()) }));
    };

    const handleCreatePost = () => {
        const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
        const postWithId = { ...newPost, id: newId, createdAt: new Date(), views: 0, likes: 0, dislikes: 0, author: '익명 사용자' }; // 임시 작성자
        setPosts([postWithId, ...posts]);
        setNewPost({ title: '', content: '', tags: '' });
        setIsCreating(false);
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
        setNewPost({ title: post.title, content: post.content, tags: post.tags.join(', ') });
        setIsCreating(true); // 수정 폼을 생성 폼과 공유
    };

    const handleUpdatePost = () => {
        if (!editingPost) return;
        const updatedPosts = posts.map(post =>
            post.id === editingPost.id ? { ...post, title: newPost.title, content: newPost.content, tags: newPost.tags.split(',').map(tag => tag.trim()) } : post
        );
        setPosts(updatedPosts);
        setNewPost({ title: '', content: '', tags: '' });
        setEditingPost(null);
        setIsCreating(false);
    };

    const handleDeletePost = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setPosts(posts.filter(post => post.id !== id));
            setSelectedPost(null);
        }
    };

    const handleShowPost = (post) => {
        setSelectedPost(post);
        setPosts(posts.map(p => (p.id === post.id ? { ...p, views: p.views + 1 } : p)));
        setComments(prevComments => ({ ...prevComments, [post.id]: prevComments[post.id] || [] }));
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = (postId) => {
        if (newComment.trim()) {
            const newCommentObject = {
                id: Date.now(),
                author: '익명 댓글러', // 임시 댓글 작성자
                content: newComment,
                createdAt: new Date(),
                postId: postId,
                parentId: null, // 최상위 댓글
                likes: 0,
                dislikes: 0,
            };
            setComments(prevComments => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), newCommentObject],
            }));
            setNewComment('');
        }
    };

    const handleAddReply = (postId, parentId) => {
        const replyText = prompt('답글을 입력하세요:');
        if (replyText && replyText.trim()) {
            const newReplyObject = {
                id: Date.now(),
                author: '익명 댓글러', // 임시 댓글 작성자
                content: replyText,
                createdAt: new Date(),
                postId: postId,
                parentId: parentId,
                likes: 0,
                dislikes: 0,
            };
            setComments(prevComments => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), newReplyObject],
            }));
        }
    };

    const handleEditComment = (postId, commentId, currentContent) => {
        const editedContent = prompt('댓글을 수정하세요:', currentContent);
        if (editedContent !== null) {
            setComments(prevComments => ({
                ...prevComments,
                [postId]: prevComments[postId].map(comment =>
                    comment.id === commentId ? { ...comment, content: editedContent } : comment
                ),
            }));
        }
    };

    const handleDeleteComment = (postId, commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setComments(prevComments => ({
                ...prevComments,
                [postId]: prevComments[postId].filter(comment => comment.id !== commentId),
            }));
        }
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
    };

    const handleDislike = (postId) => {
        setPosts(posts.map(post => (post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post)));
    };

    const handleCommentLike = (postId, commentId) => {
        setComments(prevComments => ({
            ...prevComments,
            [postId]: prevComments[postId].map(comment =>
                comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
            ),
        }));
    };

    const handleCommentDislike = (postId, commentId) => {
        setComments(prevComments => ({
            ...prevComments,
            [postId]: prevComments[postId].map(comment =>
                comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
            ),
        }));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const getSortedPosts = () => {
        let filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        switch (sortOption) {
            case 'latest':
                return [...filteredPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'popular':
                return [...filteredPosts].sort((a, b) => b.likes - a.likes);
            case 'views':
                return [...filteredPosts].sort((a, b) => b.views - a.views);
            default:
                return filteredPosts;
        }
    };

    const filteredAndSortedPosts = getSortedPosts();
    const postsPerPage = 10; // 페이지당 게시글 수
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
    const currentPosts = filteredAndSortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;
        const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);
        return (
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={currentPage === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
            </div>
        );
    };

    const handleFileUpload = (e) => {
        // 실제 파일 업로드 로직은 백엔드와 연동해야 합니다.
        const files = e.target.files;
        if (files.length > 0) {
            console.log('업로드할 파일:', files);
            // 파일 처리 로직 (예: state에 저장, 미리보기 등)
        }
    };

    const handleBookmark = (postId) => {
        alert(`게시글 ${postId}을(를) 북마크했습니다.`);
        // 실제 북마크 로직 (예: 사용자별 북마크 목록 관리)
    };

    const handleReport = (type, id) => {
        if (window.confirm(`${type}을(를) 신고하시겠습니까?`)) {
            alert(`${type}이(가) 신고되었습니다.`);
            // 실제 신고 처리 로직 (예: 백엔드에 신고 내용 전송)
        }
    };

    return (
        <div className="free-board-container">
            <header className="board-header">
                <h1>자유게시판</h1>
                {isLoggedIn && (
                    <button onClick={() => setIsCreating(true)} className="create-button">새 글 작성</button>
                )}
            </header>

            <div className="search-filter-bar">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="제목, 내용, 작성자, 태그 검색"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button>검색</button>
                </div>
                <div className="sort-options">
                    <label htmlFor="sort">정렬:</label>
                    <select id="sort" value={sortOption} onChange={handleSortChange}>
                        <option value="latest">최신순</option>
                        <option value="popular">인기순 (좋아요순)</option>
                        <option value="views">조회수순</option>
                    </select>
                </div>
            </div>

            {isCreating && (
                <div className="post-form">
                    <h2>{editingPost ? '게시글 수정' : '새 글 작성'}</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="제목"
                        value={newPost.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="content"
                        placeholder="내용"
                        value={newPost.content}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="tags"
                        placeholder="태그 (쉼표로 구분)"
                        value={newPost.tags}
                        onChange={handleTagChange}
                    />
                    <div className="file-upload">
                        <label htmlFor="file">파일 첨부</label>
                        <input type="file" id="file" multiple onChange={handleFileUpload} />
                    </div>
                    <div className="form-buttons">
                        <button onClick={editingPost ? handleUpdatePost : handleCreatePost}>
                            {editingPost ? '수정 완료' : '작성 완료'}
                        </button>
                        <button onClick={() => { setIsCreating(false); setEditingPost(null); setNewPost({ title: '', content: '', tags: '' }); }}>취소</button>
                    </div>
                </div>
            )}

            <ul className="post-list">
                {currentPosts.map(post => (
                    <li key={post.id} className="post-item">
                        <h3 onClick={() => handleShowPost(post)} className="post-title">{post.title}</h3>
                        <p className="post-meta">
                            작성자: {post.author} | 조회수: {post.views} | 좋아요: {post.likes}
                        </p>
                        <p className="post-tags">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="post-tag">#{tag}</span>
                            ))}
                        </p>
                        <div className="post-actions">
                            <button onClick={() => handleLike(post.id)}>👍 {post.likes}</button>
                            <button onClick={() => handleDislike(post.id)}>👎 {post.dislikes}</button>
                            <button onClick={() => handleBookmark(post.id)}>⭐ 북마크</button>
                            <button className="report-button" onClick={() => handleReport('게시글', post.id)}>신고</button>
                            {isLoggedIn && <button onClick={() => handleDeletePost(post.id)}>🗑️ 삭제</button>}
                        </div>
                    </li>
                ))}
            </ul>

            {renderPagination()}

            {selectedPost && (
                <div className="post-detail">
                    <h2>{selectedPost.title}</h2>
                    <p className="detail-meta">
                        작성자: {selectedPost.author} | 작성일: {new Date(selectedPost.createdAt).toLocaleDateString()} | 조회수: {selectedPost.views}
                    </p>
                    <div className="detail-content">{selectedPost.content}</div>
                    <div className="comment-section">
                        <h3>댓글</h3>
                        {isLoggedIn && (
                            <div className="comment-form">
                                <textarea
                                    placeholder="댓글을 작성하세요"
                                    value={newComment}
                                    onChange={handleCommentChange}
                                />
                                <button onClick={() => handleAddComment(selectedPost.id)}>댓글 작성</button>
                            </div>
                        )}
                        <ul className="comment-list">
                            {(comments[selectedPost.id] || []).map(comment => (
                                <li key={comment.id} className="comment-item">
                                    <p className="comment-meta">
                                        {comment.author} | 작성일: {new Date(comment.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="comment-content">{comment.content}</p>
                                    <div className="comment-actions">
                                        <button onClick={() => handleCommentLike(selectedPost.id, comment.id)}>👍 {comment.likes}</button>
                                        <button onClick={() => handleCommentDislike(selectedPost.id, comment.id)}>👎 {comment.dislikes}</button>
                                        {isLoggedIn && (
                                            <>
                                                <button onClick={() => handleAddReply(selectedPost.id, comment.id)}>💬 답글</button>
                                                <button onClick={() => handleEditComment(selectedPost.id, comment.id, comment.content)}>✏️ 수정</button>
                                                <button onClick={() => handleDeleteComment(selectedPost.id, comment.id)}>🗑️ 삭제</button>
                                            </>
                                        )}
                                    </div>
                                    <ul className="reply-list">
                                        {(comments[selectedPost.id] || [])
                                            .filter(reply => reply.parentId === comment.id)
                                            .map(reply => (
                                                <li key={reply.id} className="comment-item reply-item">
                                                    <p className="comment-meta">
                                                        {reply.author} | 작성일: {new Date(reply.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <p className="comment-content">{reply.content}</p>
                                                    <div className="comment-actions">
                                                        <button onClick={() => handleCommentLike(selectedPost.id, reply.id)}>👍 {reply.likes}</button>
                                                        <button onClick={() => handleCommentDislike(selectedPost.id, reply.id)}>👎 {reply.dislikes}</button>
                                                        {isLoggedIn && (
                                                            <>
                                                                <button onClick={() => handleEditComment(selectedPost.id, reply.id, reply.content)}>✏️ 수정</button>
                                                                <button onClick={() => handleDeleteComment(selectedPost.id, reply.id)}>🗑️ 삭제</button>
                                                            </>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => setSelectedPost(null)}>닫기</button>
                </div>
            )}
        </div>
    );
};

export default FreeBoard;