import { useEffect, useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { makeStyles, Input, Label } from "@fluentui/react-components";
import './App.css'
import { SignOutButton } from './components/SignOutButton';
import { SignInButton } from './components/SignInButton';
import { ProfileContent } from './components/ProfileContent';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const useStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        // Use 2px gap below the label (per the design system)
        gap: "2px",
        // Prevent the example from taking the full width of the page (optional)
        maxWidth: "400px",
    },
});

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const styles = useStyles();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <AuthenticatedTemplate>
                <SignOutButton />
                <ProfileContent />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <SignInButton />
            </UnauthenticatedTemplate>

            <div className={styles.root}>
                <Label htmlFor="xyz">Project</Label>
                <Input id="xyz"/>
                <Label htmlFor="xyz">Developer</Label>
                <Input id="xyz"/>
                <Label htmlFor="xyz">Address</Label>
                <Input id="xyz"/>
            </div>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;