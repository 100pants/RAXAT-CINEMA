import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material'
import React from 'react'

const MoviesListTopSkeleton = () => {
    const isMobile = useMediaQuery('(max-width:600px)')

    return (
        <Box mt={4} mb={6} sx={{ background: 'rgba(0, 0, 0, 0.02)', p: 2, borderRadius: 2 }}>
            {new Array(5).fill(null).map((_, index) => (
                <Box key={index} mb={4}>
                    <Skeleton 
                        animation="pulse"
                        variant="rounded"
                        height={42}
                        width={240}
                        sx={{ 
                            mb: 3,
                            bgcolor: 'grey.300',
                            borderRadius: '8px'
                        }}
                    />
                    
                    <Stack 
                        direction="row" 
                        justifyContent={isMobile ? 'center' : 'flex-start'}
                        flexWrap="wrap"
                        gap={3}
                        sx={{ px: isMobile ? 0 : 4 }}
                    >
                        {new Array(isMobile ? 2 : 5).fill(null).map((_, idx) => (
                            <Box key={idx} sx={{ 
                                width: isMobile ? '100%' : 230,
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    height={isMobile ? 520 : 352}
                                    sx={{
                                        bgcolor: 'grey.300',
                                        borderRadius: '12px',
                                        transform: 'none', 
                                    }}
                                />
                                
                                <Skeleton 
                                    animation="wave"
                                    variant="text"
                                    width="80%"
                                    height={28}
                                    sx={{ 
                                        mt: 1.5,
                                        bgcolor: 'grey.300',
                                        mx: 'auto'
                                    }}
                                />
                                
                                <Skeleton 
                                    animation="wave"
                                    variant="rounded"
                                    width={120}
                                    height={24}
                                    sx={{ 
                                        mt: 1,
                                        bgcolor: 'grey.300',
                                        borderRadius: '12px',
                                        mx: 'auto'
                                    }}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            ))}
        </Box>
    )
}

export default MoviesListTopSkeleton