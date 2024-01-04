import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faBook, faUsers, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const MenuButton = ({ title, onClick }) => {
    // 背景色設定
    const backgroundColor = title === 'MAP検索' || title === 'その他' ? '#FFA500' : 'white';
    // 文字色設定
    const color = title === 'MAP検索' || title === 'その他' ? 'white' : '#FFA500';

    // ボタンごとに異なるアイコンを設定
    let icon;
    switch (title) {
        case 'MAP検索':
            icon = faMapMarkedAlt;
            break;
        case 'My図鑑':
            icon = faBook;
            break;
        case 'ともだち':
            icon = faUsers;
            break;
        case 'その他':
            icon = faEllipsisH;
            break;
        default:
            icon = null;
    }
    
    return (
        <button
            style={{
                width: '100%',
                height: '90%',
                fontSize: '16px',
                borderRadius: '8px',
                backgroundColor: backgroundColor, 
                color: color,
                border: `2px solid ${backgroundColor}`, // 外側の線
                boxShadow: `inset 0 0 0 1px ${color}`, // 内側の線
                display: 'flex',
                flexDirection: 'column', // 縦方向に配置
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} size='5x' style={{ marginBottom: '12px' }} />} {/* アイコンの表示 */}
            {title}
        </button>
    );
};

export default MenuButton;