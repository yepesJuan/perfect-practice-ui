import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MonacoEditor from '../components/CodeEditor';
import ReactMarkdown from 'react-markdown';


const markdownName = `Challenge: **Two Sum**`

const markdownDescription = `
Given an array of integers \`nums\` and an integer \`target\`, return _indices of the two numbers such that they add up to \`target\`_. \n\n You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice. \n\n You can return the answer in any order. \n\n\n **Example 1:** \n\n

\n**Input:** nums = [2,7,11,15], target = 9\n**Output:** [0,1]\n**Output:** Because nums[0] + nums[1] == 9, we return [0, 1].\n

\n\n **Example 2:** \n\n

\n**Input:** nums = [3,2,4], target = 6\n**Output:** [1,2]\n

\n\n **Example 3:** \n\n

\n**Input:** nums = [3,3], target = 6\n**Output:** [0,1]\n

`

const drawerWidth = '40%';
const drawerHeight = '100%';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function CodeChallenge(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ paddingLeft: '2em', paddingRight: '2em'}}>
      <Toolbar />
      <Divider />
        <ReactMarkdown children={markdownName} />
       <Divider />
        <ReactMarkdown children={markdownDescription} />
       <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', height: '800px' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Week 1 Day 1
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: drawerHeight }}
      >
        <Toolbar />
          <MonacoEditor />
      </Box>
    </Box>
  );
}
