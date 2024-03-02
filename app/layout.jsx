

import '@styles/globals.css'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'
import { Suspense } from 'react'

export const metadata = {
    title: "Promptopia",
    description: "Discover & share AI prompts"
}

const Rootlayout = ({ children }) => {
    return (
        <html lang='en'>
            <body className=''>
                <Suspense>
                    <Provider>
                        <div className='main'>
                            <div className='gradient' />
                        </div>

                        <main>
                            <Navbar />
                            {children}
                        </main>
                    </Provider>
                </Suspense>
            </body>
        </html>
    )
}

export default Rootlayout
