param (
    [string]$vpnName
)

# Desconectar la VPN
rasdial $vpnName /disconnect

# Eliminar la conexión VPN
Remove-VpnConnection -Name $vpnName -Force