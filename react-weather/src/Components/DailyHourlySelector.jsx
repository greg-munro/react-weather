import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
const DailyHourlySelector = ({ handleDailyClick, handleHourlyClick, dailyView}) => {
  return (
    <div>
                  <Menu>
              {() => (
                <>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme='blue'
                  >
                    {dailyView ? 'Daily' : 'Hourly'}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleDailyClick('daily')}>
                      Daily
                    </MenuItem>
                    <MenuItem onClick={() => handleHourlyClick('hourly')}>
                      Hourly
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
    </div>
  )
}

export default DailyHourlySelector