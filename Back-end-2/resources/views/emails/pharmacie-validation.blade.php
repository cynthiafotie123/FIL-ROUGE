<!DOCTYPE html>
<html>
<head>
    <title>Validation de votre compte pharmacie</title>
</head>
<body>
    <h1>Félicitations ! Votre compte pharmacie a été validé</h1>
    
    <p>Bonjour,</p>
    
    <p>Votre demande de partenariat pour la pharmacie <strong>{{ $pharmacie->nom }}</strong> a été validée par notre équipe.</p>
    
    <p>Vous pouvez maintenant vous connecter à votre espace pharmacie avec les identifiants suivants :</p>
    
    <ul>
        <li>Email : {{ $email }}</li>
        <li>Mot de passe temporaire : {{ $password }}</li>
    </ul>
    
    <p>Pour des raisons de sécurité, nous vous recommandons de changer votre mot de passe dès votre première connexion.</p>
    
    <p>Pour vous connecter, cliquez sur le lien suivant :</p>
    <a href="{{ url('/pharmacie/login') }}">Accéder à mon espace pharmacie</a>
    
    <p>Cordialement,<br>L'équipe QuickMed</p>
</body>
</html> 