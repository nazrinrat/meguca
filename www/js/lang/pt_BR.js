"use strict";System.register([],function(e){var o;return{setters:[],execute:function(){o={anon:"Anônimo",search:"Pesquisa",show:"Exibir",hide:"Esconder",report:"Reportar",focus:"Focar",expand:"Expandir",last:"Últimos",see_all:"Ver todos",bottom:"Rodapé",expand_images:"Expandir Imagens",live:"ao vivo",catalog:"Catálogo","return":"Retornar",top:"Topo",reply:"Postar",newThread:"Novo tópico",locked_to_bottom:"Travado ao rodapé",you:"(Tu)",done:"Feito",send:"Enviar",locked:"trancado",thread_locked:"Este tópico está trancado.",langApplied:"Configurações de linguagem foram mudadas. Esta página recarregará agora.",googleSong:"Clique para pesquisar (google) a música",quoted:"Você foi quotado",syncwatchStarting:"Syncwatch começará em 10 segundos",finished:"Terminado.",expander:["Expandir imagens","Contrair imagens"],uploading:"Enviando...",subject:"Assunto",cancel:"Cancelar",unknownUpload:"Erro de upload desconhecido",unknownResult:"Resultado desconhecido",rescan:"Rescan",reports:{post:"Reportando post",reporting:"Reportando...",submitted:"Denúncia enviada!",setup:"Obtendo reCAPTCHA...",loadError:"Não foi possível carregar o reCATPCHA"},week:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],year:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],just_now:"agora mesmo",unit_minute:"minuto",unit_hour:"hora",unit_day:"dia",unit_month:"mês",unit_year:"ano",sync:{notSynced:"Dessincronizado",connecting:"Conectando",syncing:"Sincronizando",synced:"Sincronizado",dropped:"Caiu",reconnecting:"Reconectando"},mod:{title:["Título","Mostra o título de staff nos posts"],clearSelection:["Limpar","Limpa a seleção de posts"],spoilerImages:["Spoiler","Adiciona spoiler na imagem dos posts selecionados"],deleteImages:["Del Img","Deleta a imagem do post selecionado"],deletePosts:["Del Post","Deleta o post selecionado"],lockThreads:["Trancar","Tranca/destranca o tópico selecionado"],toggleMnemonics:["Mnemonics","Ativa a exibição de mnemonics"],sendNotification:["Notificação","Envia uma mensagem de notificação para todos os clientes"],renderPanel:["Painel","Ativa a exibição do painel de administração"],ban:["Ban","Ban o(s) usuário(s) pelos posts selecionados"],modLog:["Reg","Mostra o registro de moderação"],djPanel:["DJ","DJ tool panel"],displayBan:["Exibir","Adiciona uma mensagem 'O USUÁRIO FOI BANIDO POR ESTA POSTAGEM' publicamente"],banMessage:"O USUÁRIO FOI BANIDO POR ESTA POSTAGEM",unban:"Desbanir",placeholders:{msg:"Mensagem",days:"d",hours:"h",minutes:"min",reason:"Razão"},needReason:"É necessário especificar uma razão",7:"Spoiler adicionado à imagem",8:"Imagem deletada",9:"Postagem deletada",10:"Tópico trancado",11:"Tópico destrancado",12:"Usuário banido",53:"Usuário desbanido",formatLog:function(e){var a=o.mod[e.kind]+" por "+e.ident;return e.reason&&(a+=" pela razão de "+e.reason),a}},pluralize:function(e,o){return 1!=e&&"y"==o.slice(-1)&&["a","e","i","o","u"].indexOf(o.slice(-2,-1).toLowerCase())<0&&(o=o.slice(0,-1)+"ie"),e+" "+o+(1==e?"":"s")},capitalize:function(e){return e[0].toUpperCase()+e.slice(1)},ago:function(e,a,n){var i=o.pluralize(e,a);return n?i="em "+i:i+=" atrás",i},abbrev_msg:function(e,a,n){var i=o.pluralize(e,"postagen");return a&&(i+=" e "+o.pluralize(a,"imagen")),i+=" omitidas",n&&(i+=' <span class="act"><a href="'+n+'" class="history">'+o.see_all+"</a></span>"),i}},e("default",o)}}});
//# sourceMappingURL=maps/pt_BR.js.map
