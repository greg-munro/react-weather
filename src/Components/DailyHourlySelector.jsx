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
                    bg='gray.400'
                  >
                    {dailyView ? 'Daily' : 'Hourly'}
                  </MenuButton>
                  <MenuList bg='gray.400'>
                    <MenuItem bg='gray.400' color='black' _hover={{ bg: 'blue.700', color: 'white' }} onClick={() => handleDailyClick('daily')}>
                      Daily
                    </MenuItem>
                    <MenuItem bg='gray.400' color='black' _hover={{ bg: 'blue.700', color: 'white' }}  onClick={() => handleHourlyClick('hourly')}>
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