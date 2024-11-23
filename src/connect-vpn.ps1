param (
    [string]$vpnName,
    [string]$serverAddress,
    [string]$username,
    [string]$password,
    [string]$sharedSecret
)

# Crear la conexión VPN
Add-VpnConnection -Name $vpnName `
    -ServerAddress $serverAddress `
    -TunnelType L2tp `
    -L2tpPsk $sharedSecret `
    -AuthenticationMethod MsChapv2 `
    -EncryptionLevel Required `
    -Force

# Establecer las credenciales
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential ($username, $securePassword)

# Conectar a la VPN
rasdial $vpnName $username $password
