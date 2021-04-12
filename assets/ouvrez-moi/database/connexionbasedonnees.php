<?php
            function connectDb(){
            $DATABASE_HOST = 'localhost:3306';
            $DATABASE_USER = 'root';
            $DATABASE_PASS = '';
            $DATABASE_NAME = 'ecomotors';
        
            try {
            return new PDO('mysql:host=' . $DATABASE_HOST . ';dbname=' . $DATABASE_NAME . ';charset=utf8', $DATABASE_USER, $DATABASE_PASS);
            } catch (PDOException $exception) {
            exit('Failed to connect to database!');
            }
            }

            $Connect = connectDb();

        if(isset($_POST['nom']));
        {
            if(!empty($_POST['nom'] AND $_POST['prenom'] AND $_POST['email'] AND $_POST['date'] 
            AND $_POST['infos']))
            {echo "Merci Nous vous recontacterons au plus vite";

            $alldatas= array($_POST['nom'],$_POST['prenom'],$_POST['email'],$_POST['date'],$_POST['infos']);
            $soumission = $Connect->prepare('INSERT INTO clients (`nom`,`prenom`,`email`,`date`,`infos`)
            VALUES (?,?,?,?,?)');
            
            $soumission->execute($alldatas);
            }
            else{echo "Veuillez remplir tout les champs";}
        }
        //evite les gens qui bidouilles les pages html ! 

        
        $soumission = $Connect->prepare("SELECT * from clients");
        $soumission->execute();
        $soum = $soumission->fetchAll();

        //recupere les données pour que je les affiches
        //sous forme de tableau plus bas.
        //l'encodage de ma bd est utf8mb4_general_ci
        //car c'est celle qui etait préconisée par notre professeur
        //auparavant.


?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eco⚙️motors</title>
    <!--Pour toujours plus de personnalisation-->
    <link rel="stylesheet" href="assets/CSS/style.css">
    
</head>
    <body>
      
    <h1>
        Voici les clients à ajouter au planning.
        (si j'imagine une interface client pour le
        professionnel.)
    </h1>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">NOM</th>
                <th scope="col">PRENOM</th>
                <th scope="col">EMAIL</th>
                <th scope="col">RDV</th>
                <th scope="col">INFOS</th>
            </tr>
        </thead>
        <tbody>

            <?php  
            //attention aux br dans la colonne et reflexe inspecteur d'éléments
                for($i =0 ;$i < sizeof($soum) ; $i ++ )
                {
                ?>
                <tr>
                <td><?= $soum[$i]['ID'] ?></td>
                <td><?= $soum[$i]['nom'] ?></td>
                <td><?= $soum[$i]['prenom'] ?></td>
                <td><?= $soum[$i]['email'] ?></td>
                <td><?= $soum[$i]['date'] ?></td>
                <!--<td><?= $soum[$i]['cars'] ?></td>
                je n'ai pas vu comment mettre 
                des radio dans des bd donc je vais m'en garder-->
                <td><?= $soum[$i]['infos'] ?></td>
                </tr>
                <?php
                }
            ?>



        </tbody>
        </table>

</body>