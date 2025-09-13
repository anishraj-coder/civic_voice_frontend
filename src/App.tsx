import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient.ts";
import {Outlet} from "react-router-dom";


const App = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Outlet/>
            </QueryClientProvider>
        </div>
    );
};

export default App;