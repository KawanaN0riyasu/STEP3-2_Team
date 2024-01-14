'use client'
/*BottomAppbar.jsx */
//下部メニューバー追加
import Link from 'next/link'
import * as React from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MoreIcon from '@mui/icons-material/MoreVert';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

{/*マップボタンのスタイル */}
const StyledFab = styled(Fab)`
&& {
  position: absolute;
  z-index: 1;
  top: -30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #767676;
  width: 75px;
  height: 75px;

  &:hover {
    background-color: #FCAA00; // ホバー時の背景色を指定
  }
}
`;

{/*マップボタン以外のスタイル */}
const StyledIconButton = styled(IconButton)`
&&{
  color: #767676;

  &&:hover .MuiSvgIcon-root {
    color: #FCAA00; // ホバー時のアイコン色を指定
  }
`;

{/*メニューバー */}
function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      
      <AppBar position='relative' sx={{ backgroundColor: '#FAE7BB', top: 'auto', bottom: '0',width: '320px'}}>
        <Toolbar>
        <Link href="/00_title">
          <StyledIconButton  color="inherit" aria-label="person">
            <PersonIcon fontSize="large" />
          </StyledIconButton>
        </Link>

        <Link href="/02_mapSearch">
          <StyledFab color="primary" aria-label="FmdGood">
            <FmdGoodIcon  fontSize="large"/>
          </StyledFab>
        </Link>

        <Box sx={{ flexGrow: 1 }} />
        <Link href="/00_title">
          <StyledIconButton color="inherit">
            <GroupIcon fontSize="large" />
          </StyledIconButton>
        </Link>

        <Link href="/00_title">
          <StyledIconButton color="inherit">
            <MoreIcon fontSize="large"/>
          </StyledIconButton>
        </Link>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default BottomAppBar;