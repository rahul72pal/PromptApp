

import '@styles/globals.css'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'

export const metadata = {
    title: "Promptopia",
    description: "Discover & share AI prompts"
}

const Rootlayout = ({ children }) => {
    return (
        <html lang='en'>
            <body className=''>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Rootlayout
